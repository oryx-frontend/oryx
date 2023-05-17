import { AppRef } from '@spryker-oryx/core';
import { ssrAwaiter } from '@spryker-oryx/core/utilities';
import { resolve } from '@spryker-oryx/di';
import {
  asyncValue,
  GraphicInjectable,
  isPromise,
} from '@spryker-oryx/utilities';
import { DirectiveResult } from 'lit/directive.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Graphic, ResourcePlugin } from '../plugins';

export class DefaultGraphicInjectable implements GraphicInjectable {
  getUrl(token: string): DirectiveResult | undefined {
    return this.getGraphic(token, 'url');
  }

  getSource(token: string): DirectiveResult | undefined {
    return this.getGraphic(token, 'source');
  }

  protected getGraphic(
    token: string,
    key: keyof Graphic
  ): DirectiveResult | undefined {
    const resourcesPlugin = resolve(AppRef).findPlugin(ResourcePlugin);
    const value = resourcesPlugin?.getGraphic(token, key);
    const render = (v: string): DirectiveResult | string =>
      key === 'source' ? unsafeHTML(v) : v;

    if (value === undefined) {
      return;
    }

    if (isPromise(value)) {
      return asyncValue(ssrAwaiter(value), render);
    }

    return render(value);
  }
}