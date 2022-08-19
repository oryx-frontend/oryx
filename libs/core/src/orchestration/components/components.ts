import { isNodeElement } from '@spryker-oryx/core/utilities';
import { isDefined, Type } from '@spryker-oryx/typescript-utils';
import { AppPlugin } from '../app';
import {
  isObservableShadowElement,
  observableShadow,
  ObservableShadowElement,
} from './observable-shadow';

export type ComponentInfo = ComponentDef | ComponentDefFn;

export type ComponentsInfo = (ComponentInfo | ComponentInfo[])[];

export interface ComponentDef {
  readonly name: string;
  readonly impl: ComponentDefImpl;
}

export type ComponentDefFn = () => ComponentDef;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Component extends HTMLElement {}

export type ComponentType = Type<Component>;

export type ComponentDefImpl =
  | ComponentType
  | (() => Promise<ComponentType>)
  | ComponentImplStrategy;

export interface ComponentImplMeta {
  readonly foundInDom?: boolean;
  readonly programmaticLoad?: boolean;
}

export interface ComponentImplStrategy {
  load(
    def: ComponentDef,
    meta: ComponentImplMeta
  ): Promise<ComponentType | undefined>;
}

export interface ComponentsPluginOptions {
  root: ComponentInfo | string;
  elementOptions?: ElementDefinitionOptions;
  logger?: Pick<Console, 'warn'>;
  preload?: boolean;
}

export function componentDef(def: ComponentDef) {
  return (overrides?: Partial<ComponentDef>): ComponentDef => ({
    ...def,
    ...overrides,
  });
}

export const ComponentsPluginName = 'core$components';

/**
 *  Registers, loads and defines components. Observes nodes (including shadowDOM)
 */
export class ComponentsPlugin implements AppPlugin {
  protected readonly componentDefMap = new Map<string, ComponentDef>();

  protected readonly logger = this.options.logger ?? console;

  protected readonly componentMap = new Map<
    string,
    Type<ObservableShadowElement>
  >();

  protected readonly observer = new MutationObserver(
    this.handleMutations.bind(this)
  );

  protected readonly implMetaPreload: ComponentImplMeta = {};
  protected readonly implMetaInDom: ComponentImplMeta = { foundInDom: true };
  protected readonly implMetaProgrammatic: ComponentImplMeta = {
    programmaticLoad: true,
  };

  constructor(
    componentsInfo: ComponentsInfo,
    protected readonly options: ComponentsPluginOptions
  ) {
    this.registerComponents(componentsInfo);
  }

  getName(): string {
    return ComponentsPluginName;
  }

  async apply(): Promise<void> {
    if (this.options.preload) {
      await this.preloadComponents();

      return;
    }

    const rootSelector =
      typeof this.options.root === 'string'
        ? this.options.root
        : this.processDef(this.options.root).name;

    const rootElement = document.querySelector?.(rootSelector);

    if (!rootElement) {
      throw new ComponentsPluginError(
        `Cannot find root element by selector '${rootSelector}'!`
      );
    }

    await this.preloadComponents();

    this.observe(rootElement);
  }

  destroy(): void {
    this.observer.disconnect();
  }

  registerComponents(componentsInfo: ComponentsInfo): void {
    componentsInfo.flat().forEach((info) => {
      const def = this.processDef(info);
      this.componentDefMap.set(def.name, def);
    });
  }

  async loadComponent(name: string): Promise<ComponentType | undefined> {
    return this.loadAndDefineComponent(name, this.implMetaProgrammatic);
  }

  protected observe(element: Node): void {
    this.observer.observe(element, {
      subtree: true,
      childList: true,
      attributes: false,
      characterData: false,
    });

    // Start first check immediately
    this.checkNode(element);
  }

  protected handleMutations(mutations: MutationRecord[]): void {
    this.checkNodes(mutations.map((m) => Array.from(m.addedNodes)).flat());
  }

  protected checkNodes(nodes: Node[]): void {
    nodes.forEach((node) => this.checkNode(node));
  }

  protected checkNode(node: Node): void {
    if (isNodeElement(node)) {
      const tag = this.processName(node.nodeName);

      if (node.shadowRoot) {
        this.observe(node.shadowRoot);
      } else if (isObservableShadowElement(node)) {
        this.observeShadow(node);
      } else {
        this.tryLoadAndDefineComponent(tag, this.implMetaInDom).then(() => {
          customElements.upgrade(node);
          this.maybeObserveShadow(node);
        });
      }
    }

    this.checkNodes(Array.from(node.childNodes));
  }

  protected maybeObserveShadow(element: HTMLElement): void {
    if (isObservableShadowElement(element)) {
      this.observeShadow(element);
    }
  }

  protected observeShadow(element: ObservableShadowElement): void {
    element.whenShadowAttached().then((shadowRoot) => this.observe(shadowRoot));
  }

  protected async preloadComponents(): Promise<void> {
    const preloaded = await Promise.all(
      Array.from(this.componentDefMap.values()).map((def) =>
        this.maybeLoadComponentImplStrategy(def, this.implMetaPreload)
      )
    );

    preloaded
      .filter(isDefined)
      .map(({ def, componentType }) =>
        this.useComponent(def.name, componentType)
      );
  }

  protected async tryLoadAndDefineComponent(
    name: string,
    meta: ComponentImplMeta
  ): Promise<ComponentType | undefined> {
    try {
      return await this.loadAndDefineComponent(name, meta);
    } catch {
      // That's okay, we tried
      return;
    }
  }

  protected async loadAndDefineComponent(
    name: string,
    meta: ComponentImplMeta
  ): Promise<ComponentType | undefined> {
    const def = this.findComponentDefBy(name);
    const componentType = await this.loadComponentDef(def, meta);

    // If component not yet loaded - skip definition
    if (!componentType) {
      return;
    }

    this.useComponent(name, componentType, true);

    return componentType;
  }

  protected useComponent(
    name: string,
    componentType: ComponentType,
    noWarn = false
  ): void {
    const existingType = customElements.get(name);

    if (existingType) {
      if (!noWarn) {
        this.logger.warn(
          `Component '${name}' already defined as '${existingType.name}', skipping definition of '${componentType.name}'!`
        );
      }
      return;
    }

    customElements.define(name, componentType, this.options.elementOptions);
  }

  /**
   * Checks if component has a strategy and loads it. Mostly used for preloading the component.
   */
  protected async maybeLoadComponentImplStrategy(
    def: ComponentDef,
    meta: ComponentImplMeta
  ): Promise<
    | { def: ComponentDef; componentType: Type<ObservableShadowElement> }
    | undefined
  > {
    if (!isComponentImplStrategy(def.impl) && !this.options.preload) {
      return;
    }

    const componentType = await this.loadComponentDef(def, meta);

    if (componentType) {
      return { def, componentType };
    }

    return;
  }

  protected async loadComponentDef(
    def: ComponentDef,
    meta: ComponentImplMeta
  ): Promise<Type<ObservableShadowElement> | undefined> {
    if (this.componentMap.has(def.name)) {
      return this.componentMap.get(def.name);
    }

    const componentType = await this.loadComponentImpl(def, meta);

    if (!componentType) {
      return;
    }

    const observableType = observableShadow(componentType);

    this.componentMap.set(def.name, observableType);

    return observableType;
  }

  protected async loadComponentImpl(
    def: ComponentDef,
    meta: ComponentImplMeta
  ): Promise<ComponentType | undefined> {
    const impl = def.impl;

    if (isComponentImplStrategy(impl)) {
      return await impl.load(def, meta);
    } else {
      return await this.loadComponentImplFn(impl);
    }
  }

  protected loadComponentImplFn(
    impl: ComponentType | (() => Promise<ComponentType>)
  ): ComponentType | Promise<ComponentType> {
    try {
      // Try to call as a function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (impl as any)();
    } catch {
      // Otherwise use as a type
      return impl as ComponentType;
    }
  }

  protected findComponentDefBy(name: string): ComponentDef {
    if (!this.componentDefMap.has(name)) {
      throw new ComponentsPluginError(`Component '${name}' is not registered!`);
    }

    // ComponentDef is checked above
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.componentDefMap.get(name)!;
  }

  protected processDef(info: ComponentInfo): ComponentDef {
    const def = typeof info === 'function' ? info() : info;

    return { ...def, name: this.processName(def.name) };
  }

  protected processName(name: string): string {
    return name.toLowerCase();
  }
}

export class ComponentsPluginError extends Error {
  constructor(msg: string) {
    super(`ComponentsAppPlugin: ${msg}`);
  }
}

function isComponentImplStrategy(
  impl: ComponentDefImpl
): impl is ComponentImplStrategy {
  return typeof impl === 'object';
}