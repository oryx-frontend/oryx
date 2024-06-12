import { RouteType } from '@oryx-frontend/router';
import { RouteConfig } from '@oryx-frontend/router/lit';

export const orderRoutes: RouteConfig[] = [
  {
    path: '/order/:id',
    type: RouteType.Order,
  },
];
