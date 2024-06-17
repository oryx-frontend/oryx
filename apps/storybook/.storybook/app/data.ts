import { backofficeResources } from '@oryx-frontend/presets/backoffice';
import { fesResources } from '@oryx-frontend/presets/fes';
import { storefrontResources } from '@oryx-frontend/presets/storefront';
import {
  backofficeTheme,
  fesTheme,
  storefrontTheme,
} from '@oryx-frontend/themes';

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
