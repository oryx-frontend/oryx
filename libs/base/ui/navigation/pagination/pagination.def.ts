import { componentDef } from '@oryx-frontend/utilities';

export const paginationComponent = componentDef({
  name: 'oryx-pagination',
  impl: () =>
    import('./pagination.component').then((m) => m.PaginationComponent),
});
