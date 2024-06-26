import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import {
  AppPlugin,
  AppPluginAfterApply,
  AppPluginBeforeApply,
  HydrationService,
} from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { rootInjectable } from '@oryx-frontend/utilities';
import { hydrateShadowRoots } from '@webcomponents/template-shadowroot/template-shadowroot.js';
import { LitElement } from 'lit';

declare global {
  function litElementHydrateSupport(param: {
    LitElement: typeof LitElement;
  }): void;
}

export const RootPluginName = 'application$root';

export class RootPlugin
  implements AppPlugin, AppPluginBeforeApply, AppPluginAfterApply
{
  getName(): string {
    return RootPluginName;
  }

  beforeApply(): void {
    try {
      hydrateShadowRoots(document.body);
    } catch (e) {
      console.log(e);
    }

    // This doesn't get called at the right time by lit-html, so we do it here
    globalThis.litElementHydrateSupport?.({ LitElement });
  }

  apply(): void {
    if (!document.querySelector(rootInjectable.get())?.shadowRoot) {
      resolve(RouterService).go(window.location.pathname);
    }
  }

  afterApply(): void {
    resolve(HydrationService).initHydrateHooks();
  }
}
