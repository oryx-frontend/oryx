import { Theme } from '@oryx-frontend/experience';
import {
  backofficeIcons,
  fontawesomeIcons,
  materialDesignIcons,
} from '@oryx-frontend/resources';
import { defaultBreakpoints } from '@oryx-frontend/themes/breakpoints';
import { IconTypes } from '@oryx-frontend/ui/icon';

export const backofficeTheme: Theme = {
  name: 'backoffice',
  breakpoints: defaultBreakpoints,
  designTokens: () =>
    import('../design-tokens/src/backoffice').then((s) => s.backofficeTokens),
  icons: {
    resource: fontawesomeIcons,
    resources: [
      {
        resource: materialDesignIcons,
        types: [
          IconTypes.Report,
          IconTypes.Refresh,
          IconTypes.Location,
          IconTypes.Carrier,
          IconTypes.Printer,
        ],
      },
      {
        resource: backofficeIcons,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        types: Object.keys(backofficeIcons.mapping!),
      },
    ],
  },
};
