import { renderApp, RenderAppConfig } from '@oryx-frontend/application';
import { html } from 'lit';
import { app } from '../src/app';

export const render = (
  config: Omit<RenderAppConfig, 'element'>
): Promise<string> =>
  renderApp(
    {
      ...config,
      element: html`<oryx-app></oryx-app>`,
    },
    app
  );
