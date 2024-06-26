import { ContextController } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import {
  Component,
  ComponentsRegistryService,
  CompositionProperties,
  ContentMixin,
  ExperienceService,
  LayoutBuilder,
  LayoutMixin,
  LayoutMixinInternals,
  LayoutPluginRender,
} from '@oryx-frontend/experience';
import { RouterService } from '@oryx-frontend/router';
import {
  computed,
  effect,
  elementEffect,
  featureVersion,
  hydratableAttribute,
  hydrate,
  signal,
  signalAware,
  signalProperty,
  subscribe,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html, isServer } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import { Observable, concatMap, from, map, of, reduce, tap } from 'rxjs';
import { CompositionComponentsController } from './composition-components.controller';
import { CompositionComponentProperties } from './composition.model';

@signalAware()
@hydrate()
export class CompositionComponent
  extends LayoutMixin(ContentMixin<CompositionProperties>(LitElement))
  implements CompositionComponentProperties
{
  @signalProperty({ reflect: true }) uid?: string;
  @signalProperty({ reflect: true }) route?: string;
  @property({ reflect: true }) bucket?: string;

  protected experienceService = resolve(ExperienceService);
  protected routerService = resolve(RouterService);
  protected registryService = resolve(ComponentsRegistryService);
  protected layoutBuilder = resolve(LayoutBuilder);

  protected contextController = new ContextController(this);
  protected componentsController = new CompositionComponentsController(this);

  protected componentFromRoute$ = computed(() =>
    this.experienceService
      .getComponent({ route: this.route })
      .pipe(map((component) => (component?.id ? component : null)))
  );

  @elementEffect()
  protected $uidFromRoute = effect(() => {
    if (!this.route) {
      return;
    }

    const component = this.componentFromRoute$();

    if (component === null || !component?.id) {
      this.uid = undefined;
      return;
    }

    if (this.uid !== component?.id) {
      this.uid = component.id;
    }
  });

  private providedContext: string[] = [];

  // TODO: change to elementEffect when SSR issue will be fixed
  @subscribe()
  private $contextProvider = this.contentController.getOptions().pipe(
    tap((options) => {
      const contexts = options?.context;
      const types: string[] = [];
      const data = Object.entries(contexts ?? {});

      for (const [type, context] of data) {
        types.push(type);
        this.contextController.provide(type, context);
      }

      for (const key of this.providedContext) {
        if (types.includes(key)) continue;
        this.contextController.remove(key);
      }

      this.providedContext = [...types];
    })
  );

  protected $componentData = computed(() =>
    this.experienceService.getComponent({ uid: this.uid })
  );
  protected $components = signal(this.componentsController.getComponents());
  protected $componentsStyles = computed(() => {
    const components = this.$components();

    if (!components?.length) return of('');

    return this[LayoutMixinInternals].layoutService.getStylesFromOptions({
      composition: components,
      screen: this.$screen(),
    });
  });

  protected $hasDynamicallyVisibleComponent = signal(
    this.componentsController.hasDynamicallyVisibleComponent()
  );

  @elementEffect()
  protected hydrateOnLoad = effect(() => {
    //TODO: find better way to hydrate composition
    //with dynamically visible components
    if (
      isServer &&
      this.$hasDynamicallyVisibleComponent() &&
      this.getAttribute(hydratableAttribute) !== 'window:load'
    ) {
      this.setAttribute(hydratableAttribute, 'window:load');
    }
  });

  protected getCompositionLayoutRender(): Observable<
    Record<string, LayoutPluginRender>
  > {
    const components = this.$components();

    if (!components?.length) return of({});

    return from(components).pipe(
      concatMap((component) => {
        return this.getLayoutPluginsRender({
          options: component.options,
          experience: component,
          template: this.renderComponent(component),
          isComposition: true,
        }).pipe(map((template) => ({ [component.id]: template })));
      }),
      reduce((acc, curr) => ({ ...acc, ...(curr ?? {}) }), {})
    );
  }

  protected $layoutRenderComposition = computed(() =>
    this.getCompositionLayoutRender()
  );

  protected override render(): TemplateResult | void {
    return featureVersion >= '1.2'
      ? this.standardRender()
      : this.legacyRender();
  }

  private standardRender(): TemplateResult | void {
    const components = this.$components();

    if (!components?.length) return;

    const layoutComposition = this.$layoutRenderComposition();

    return this.renderLayout({
      template: html`${repeat(
        components,
        (component) => component.id,
        (component) => {
          const layoutTemplate = layoutComposition?.[component.id];

          return html`
            ${layoutTemplate?.pre}
            ${layoutTemplate?.inner ?? this.renderComponent(component)}
            ${layoutTemplate?.post}
          `;
        }
      ) as TemplateResult}`,
      experience: this.$componentData(),
      inlineStyles: this.$componentsStyles(),
    });
  }

  private legacyRender(): TemplateResult | void {
    const components = this.$components();

    if (!components?.length) return;

    const inlineStyles = this.layoutBuilder.collectStyles(components);
    const layoutStyles = this.layoutStyles() ?? '';
    const styles = inlineStyles + layoutStyles;

    return html`${repeat(
      components,
      (component) => component.id,
      (component) => this.renderComponent(component)
    )}
    ${when(styles, () => unsafeHTML(`<style>${styles}</style>`))} `;
  }

  protected renderComponent(
    component: Component<CompositionProperties>
  ): TemplateResult {
    const template = this.registryService.resolveTemplate({
      type: component.type,
      uid: component.id,
      markers: this.layoutBuilder.getLayoutMarkers(component.options),
    });
    return html`${template}`;
  }
}
