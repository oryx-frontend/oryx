import { ResourceGraphic } from '@oryx-frontend/experience';

export const commonGraphics: ResourceGraphic = {
  logo: {
    source: () => import('./logo').then((m) => m.logo),
  },
  'logo-wordmark': {
    source: () => import('./logo').then((m) => m.logoWordmark),
  },
  'logo-symbol': {
    source: () => import('./logo').then((m) => m.logoSymbol),
  },
  'order-confirmation-success': {
    source: () => import('./order-confirmation-success').then((m) => m.success),
  },
};
