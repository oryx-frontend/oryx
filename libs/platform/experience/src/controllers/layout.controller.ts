import { ssrAwaiter } from '@oryx-frontend/core/utilities';
import { resolve } from '@oryx-frontend/di';
import {
  LayoutAttributes,
  LayoutProperties,
} from '@oryx-frontend/experience/layout';
import { Size, featureVersion, sizes } from '@oryx-frontend/utilities';
import { LitElement, html } from 'lit';
import { Observable, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import {
  CompositionProperties,
  ContentComponentProperties,
  StyleRuleSet,
} from '../models';
import {
  LayoutBuilder,
  LayoutPluginRender,
  LayoutPluginRenderParams,
  LayoutPluginType,
  LayoutService,
  ResponsiveLayoutInfo,
} from '../services';

export type LayoutControllerRender = Omit<
  LayoutPluginRenderParams,
  'options' | 'element'
> & {
  options?: CompositionProperties;
};

export interface LayoutRenderParams {
  attrs: string[];
  data: LayoutControllerRender;
  screen?: Size;
}

export class LayoutController {
  protected layoutService = resolve(LayoutService);
  protected layoutBuilder = resolve(LayoutBuilder);

  constructor(
    protected host: LitElement & LayoutAttributes & ContentComponentProperties
  ) {}

  getStyles(
    properties: string[],
    rules: StyleRuleSet[] = [],
    screen?: string
  ): Observable<string> {
    return featureVersion >= '1.2'
      ? this.getStandardStyles(properties, rules, screen)
      : this.getLegacyStyles(properties, rules);
  }

  private getStandardStyles(
    properties: string[],
    rules: StyleRuleSet[],
    screen?: string
  ): Observable<string> {
    const props = this.normalizeProperties(properties, rules);
    const infos = this.getLayoutInfos(props, rules);

    return ssrAwaiter(
      combineLatest([
        this.getLayoutOptions(properties, rules, screen).pipe(
          switchMap((layoutOptions) =>
            this.layoutService.getStyles(infos, layoutOptions)
          )
        ),
        this.getComponentStyles(props, rules, this.host.uid),
      ])
    ).pipe(
      map(
        ([layoutStyles, componentStyles]) => `${layoutStyles}${componentStyles}`
      )
    );
  }

  private getLegacyStyles(
    properties: string[],
    rules: StyleRuleSet[]
  ): Observable<string> {
    const infos = this.getLayoutInfos(
      properties as (keyof LayoutProperties)[],
      rules
    );

    const componentStyles = this.collectStyles(
      properties as (keyof LayoutProperties)[],
      rules,
      this.host.uid
    );

    return this.layoutService
      .getStyles(infos)
      .pipe(map((layoutStyles) => `${layoutStyles}${componentStyles}`));
  }

  /**
   * @deprecated since 1.2 will be removed.
   */
  collectStyles(
    layoutProperties: (keyof LayoutProperties)[],
    rules: StyleRuleSet[] = [],
    uid?: string
  ): string {
    let styles = '';

    if (!this.hasLayout(rules, layoutProperties)) {
      styles += ':host {display: contents;}\n';
    }

    styles += this.layoutBuilder.createStylesFromOptions(rules, uid);

    return styles;
  }

  getRender(config: LayoutRenderParams): Observable<LayoutPluginRender> {
    const { screen, attrs, data } = config;

    return this.getLayoutOptions(attrs, data.options?.rules, screen).pipe(
      switchMap((layoutOptions) => {
        return Object.entries(layoutOptions).reduce(
          (prevData$, [prop, value]) => {
            return prevData$.pipe(
              switchMap((prevData) => {
                if (!value) return of({});

                const token = prop === 'layout' ? (value as string) : prop;
                const type =
                  prop === 'layout'
                    ? LayoutPluginType.Layout
                    : LayoutPluginType.Property;

                return this.layoutService
                  .getRender({
                    type,
                    token,
                    data: {
                      ...data,
                      template: prevData?.wrapper ?? data.template,
                      element: this.host,
                      options: layoutOptions,
                    },
                  })
                  .pipe(
                    startWith(undefined),
                    map((templates) => {
                      const mapper = { ...prevData, ...templates };

                      return (
                        Object.keys(mapper) as (keyof LayoutPluginRender)[]
                      ).reduce((acc, key) => {
                        const template = templates?.[key];
                        const prevTemplate = prevData?.[key];

                        if (!template && !prevTemplate) {
                          return acc;
                        }

                        if (key === 'wrapper') {
                          const mergedValue = template ?? prevTemplate;

                          return { ...acc, [key]: mergedValue };
                        }

                        const mergedValue =
                          template && prevTemplate
                            ? html`${template}${prevTemplate}`
                            : template
                            ? html`${template}`
                            : html`${prevTemplate}`;

                        return { ...acc, [key]: mergedValue };
                      }, {});
                    })
                  );
              })
            );
          },
          of({} as LayoutPluginRender)
        );
      })
    );
  }

  protected getLayoutOptions(
    attrs: string[],
    styles: StyleRuleSet[] = [],
    screen?: string
  ): Observable<LayoutProperties> {
    const host = this.host;

    const hostProperties = ['layout', ...attrs].reduce((acc, attr) => {
      const value = host[attr as keyof typeof host];

      if (attr === 'layout' && value) {
        return { ...acc, layout: value };
      }

      if (host.hasAttribute(attr)) {
        const prop = attr
          .replace('layout-', '')
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        return {
          ...acc,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          [prop]: this.parseAttribute(host.getAttribute(attr)!),
        };
      }

      return acc;
    }, {});

    return this.layoutBuilder.getActiveLayoutRules(styles, screen).pipe(
      map((layoutProperties) => ({
        ...layoutProperties,
        ...hostProperties,
        ...(screen
          ? (host[
              `layout${screen.charAt(0).toUpperCase()}${screen.slice(
                1
              )}` as keyof typeof host
            ] as Record<string, unknown>)
          : {}),
      }))
    );
  }

  protected parseAttribute(attribute: string): string | boolean | number {
    if (/^-?\d*\.?\d+$/.test(attribute)) return Number(attribute);
    if (attribute === 'false') return false;
    if (attribute === 'true') return true;

    return attribute || true;
  }

  /**
   * Returns dynamic styles provided by component options.
   *
   * When the component does not have a layout, we add a rule to
   * ensure that the component children can transparently work with the
   * layout provided outside:
   *
   * ```css
   * :host {
   *   display: contents;
   * }
   * ```
   */
  protected getComponentStyles(
    layoutProperties: (keyof LayoutProperties)[],
    rules: StyleRuleSet[] = [],
    uid?: string
  ): Observable<string> {
    let styles = '';

    if (layoutProperties.length === 1 && !this.hasLayout(rules)) {
      styles += ':host {display: contents;}\n';
    }

    return this.layoutService
      .getStylesFromOptions({ rules, id: uid })
      .pipe(map((optionsStyles) => `${styles}${optionsStyles}`));
  }

  protected normalizeProperties(
    properties: string[],
    rules: StyleRuleSet[]
  ): (keyof LayoutProperties)[] {
    const props = ['layout', ...properties.map(this.getPropertyName)];
    const ruleProps: StyleRuleSet[] = [...(rules ?? [])];

    for (const ruleProp of ruleProps) {
      if (typeof ruleProp.layout === 'string' && !props.includes('layout')) {
        props.push('layout');

        continue;
      }

      if (typeof ruleProp.layout === 'object') {
        for (const prop of Object.keys(ruleProp.layout)) {
          if (prop === 'type' && !props.includes('layout')) {
            props.push('layout');

            continue;
          }

          if (prop === 'type') continue;

          if (!props.includes(prop)) props.push(prop);
        }
      }
    }

    return props as (keyof LayoutProperties)[];
  }

  protected getPropertyName(attrName: string): keyof LayoutProperties {
    return attrName === 'layout'
      ? attrName
      : (attrName.replace('layout-', '') as keyof LayoutProperties);
  }

  protected getLayoutInfos(
    properties: (keyof LayoutProperties)[],
    rules: StyleRuleSet[] = []
  ): ResponsiveLayoutInfo {
    return featureVersion >= '1.2'
      ? this.getStandardLayoutInfos(properties, rules)
      : this.getLegacyLayoutInfos(properties, rules);
  }

  private getStandardLayoutInfos(
    properties: (keyof LayoutProperties)[],
    rules: StyleRuleSet[] = []
  ): ResponsiveLayoutInfo {
    const isRule = (rule: StyleRuleSet, isLayout: boolean, ruleProp: string) =>
      (typeof rule.layout === 'string' && isLayout) ||
      (typeof rule.layout === 'object' &&
        rule.layout[ruleProp as keyof typeof rule.layout]);
    const getRuleValue = (rule?: StyleRuleSet, prop?: string) =>
      typeof rule?.layout === 'string'
        ? rule.layout
        : rule?.layout?.[prop as keyof typeof rule.layout];
    const getType = (isLayout: boolean) =>
      isLayout ? LayoutPluginType.Layout : LayoutPluginType.Property;

    return properties.reduce((info, prop) => {
      const host = this.host;
      const isLayout = prop === 'layout';
      const hostProp = (
        isLayout ? prop : `layout-${prop}`
      ) as keyof typeof host;
      const ruleProp = isLayout ? 'type' : prop;
      const ruleValue = rules.find(
        (rule) => !rule.query?.breakpoint && isRule(rule, isLayout, ruleProp)
      );
      const mainValue = host[hostProp] ?? getRuleValue(ruleValue, ruleProp);

      const mainKey = (isLayout ? mainValue : prop) as string;
      const withMainValue = typeof mainValue !== 'undefined';

      if (withMainValue) {
        info[mainKey] = { type: getType(isLayout) };
      }

      for (const size of sizes) {
        const ruleSizeValue = rules.find(
          (rule) =>
            rule.query?.breakpoint === size && isRule(rule, isLayout, ruleProp)
        );
        const sizeValue =
          host[size]?.[prop] ?? getRuleValue(ruleSizeValue, ruleProp);
        const sizeKey = (isLayout ? sizeValue : prop) as string;

        if (
          typeof sizeValue === 'undefined' ||
          !sizeKey ||
          String(sizeValue) === String(mainValue)
        ) {
          continue;
        }

        if (withMainValue && String(sizeValue) !== String(mainValue)) {
          info[mainKey].excluded ??= [];
          info[mainKey].excluded?.push(size);
        }

        if (withMainValue && sizeKey === mainKey) continue;

        info[sizeKey] ??= { type: getType(isLayout) };
        const dataSize = info[sizeKey];

        dataSize.included ??= [];
        dataSize.included.push(size);
      }

      return info;
    }, {} as ResponsiveLayoutInfo);
  }

  /**
   * @deprecated since 1.2 will be removed.
   */
  private getLegacyLayoutInfos(
    properties: (keyof LayoutProperties)[],
    rules: StyleRuleSet[] = []
  ): ResponsiveLayoutInfo {
    return properties.reduce((info, prop) => {
      const isLayout = prop === 'layout';
      const mainValue =
        this.host[prop] ??
        rules.find((rule) => !rule.query?.breakpoint && rule[prop])?.[prop];
      const mainKey = (isLayout ? mainValue : prop) as string;
      const withMainValue = typeof mainValue !== 'undefined';

      if (withMainValue) {
        info[mainKey] = {};
      }

      for (const size of sizes) {
        const sizeValue =
          this.host[size]?.[prop] ??
          rules.find(
            (rule) =>
              rule.query?.breakpoint === size &&
              typeof rule[prop] !== 'undefined'
          )?.[prop];
        const sizeKey = (isLayout ? sizeValue : prop) as string;

        if (
          typeof sizeValue === 'undefined' ||
          !sizeKey ||
          String(sizeValue) === String(mainValue)
        ) {
          continue;
        }

        if (withMainValue && String(sizeValue) !== String(mainValue)) {
          info[mainKey].excluded ??= [];
          info[mainKey].excluded?.push(size);
        }

        if (withMainValue && sizeKey === mainKey) {
          continue;
        }

        info[sizeKey] ??= {};
        const dataSize = info[sizeKey];

        dataSize.included ??= [];
        dataSize.included.push(size);
      }

      return info;
    }, {} as ResponsiveLayoutInfo);
  }

  protected hasLayout(
    rules: StyleRuleSet[],
    layoutProperties: (keyof LayoutProperties)[] = []
  ): boolean {
    if (featureVersion >= '1.2') {
      return (
        !!this.host.layout ||
        rules?.some((rule) =>
          typeof rule.layout === 'object' ? rule.layout.type : rule.layout
        )
      );
    }

    return this.legacyHasLayout(rules, layoutProperties);
  }

  /**
   * @deprecated since 1.2 will be removed.
   */
  private legacyHasLayout(
    rules: StyleRuleSet[],
    layoutProperties: (keyof LayoutProperties)[] = []
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const has = (obj: any): boolean =>
      layoutProperties.some(
        (prop) => obj[prop] || sizes.some((size) => obj[size]?.[prop])
      );

    return has(this.host) || rules?.some((rule) => has(rule));
  }
}
