import { Theme } from '@oryx-frontend/experience';
import { materialDesignIcons } from '@oryx-frontend/resources';
import { defaultBreakpoints } from '@oryx-frontend/themes/breakpoints';

/**
 * @deprecated since version 1.1 use backofficeTheme instead
 * */
export const fesTheme: Theme = {
  name: 'fes',
  breakpoints: defaultBreakpoints,
  designTokens: () =>
    import('../design-tokens/src/backoffice').then((s) => s.backofficeTokens),
  icons: {
    resource: materialDesignIcons,
  },
};
