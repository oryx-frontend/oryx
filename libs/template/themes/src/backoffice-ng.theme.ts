import { Theme } from '@oryx-frontend/experience';
import { backofficeNgIcons } from '@oryx-frontend/resources';
import { defaultBreakpoints } from '@oryx-frontend/themes/breakpoints';

/**
 * @deprecated since version 1.2 use backofficeTheme or fulfillmentTheme instead
 * */
export const backofficeNgTheme: Theme = {
  name: 'backoffice-ng',
  breakpoints: defaultBreakpoints,
  designTokens: () =>
    import('../design-tokens/src/backoffice').then((s) => s.backofficeTokens),
  icons: {
    resource: backofficeNgIcons,
  },
};
