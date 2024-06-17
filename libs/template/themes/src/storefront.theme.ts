import { Theme } from '@oryx-frontend/experience';
import { materialDesignIcons, storefrontIcons } from '@oryx-frontend/resources';
import { defaultBreakpoints } from '@oryx-frontend/themes/breakpoints';

export const storefrontTheme: Theme = {
  name: 'storefront',
  breakpoints: defaultBreakpoints,
  designTokens: () =>
    import('../design-tokens/src/storefront').then((s) => s.storefrontTokens),
  icons: {
    resource: materialDesignIcons,
    resources: [
      {
        resource: storefrontIcons,
        types: Object.keys(storefrontIcons.mapping ?? {}),
      },
    ],
  },
};
