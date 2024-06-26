import { AppPlugin, AppPluginBeforeApply } from '@oryx-frontend/core';
import { rootInjectable } from '@oryx-frontend/utilities';
import { isServer } from 'lit';

export const previewPluginName = 'oryx.experiencePreview';

export class PreviewPlugin implements AppPlugin, AppPluginBeforeApply {
  getName(): string {
    return previewPluginName;
  }

  apply(): void {
    //
  }

  beforeApply(): void {
    const root = rootInjectable.get();

    if (!isServer && root === 'body') {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rootElement = document.querySelector(root)!;

    if (!isServer && rootElement.shadowRoot) {
      rootElement.outerHTML = `<${root}></${root}>`;
    }
  }
}
