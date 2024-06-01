import { backofficeResources } from '@spryker-oryx/presets/backoffice';
import { fesResources } from '@spryker-oryx/presets/fes';
import { storefrontResources } from '@spryker-oryx/presets/storefront';
import {
  backofficeTheme,
  fesTheme,
  storefrontTheme,
} from '@spryker-oryx/themes';

export const theme = {
  default: 'backoffice',
  list: {
    storefront: [storefrontTheme],
    backoffice: [backofficeTheme],
    fes: [fesTheme],
  },
};

export const resource = {
  default: 'backoffice',
  list: {
    storefront: storefrontResources,
    backoffice: backofficeResources,
    fes: fesResources,
  },
};
