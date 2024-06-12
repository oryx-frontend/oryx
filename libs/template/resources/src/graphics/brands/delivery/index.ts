import { ResourceGraphic } from '@oryx-frontend/experience';

export const deliveryMethodsLogos: ResourceGraphic = {
  dhl: { source: () => import('./dhl').then((m) => m.resource) },
  dhlExpress: { source: () => import('./dhl-express').then((m) => m.resource) },
  hermes: { source: () => import('./hermes').then((m) => m.resource) },
};
