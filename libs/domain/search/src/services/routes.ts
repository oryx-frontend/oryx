import { RouteType } from '@oryx-frontend/router';
import { RouteConfig } from '@oryx-frontend/router/lit';

export const categoryRoutes: RouteConfig[] = [
  {
    path: '/category/:id',
    type: RouteType.Category,
  },
];
