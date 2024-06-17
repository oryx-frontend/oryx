import { RouteType } from '@oryx-frontend/router';
import { RouteConfig } from '@oryx-frontend/router/lit';

export const productRoutes: RouteConfig[] = [
  {
    path: '/product/:sku',
    type: RouteType.Product,
  },
  {
    path: '/search',
    type: RouteType.ProductList,
  },
];
