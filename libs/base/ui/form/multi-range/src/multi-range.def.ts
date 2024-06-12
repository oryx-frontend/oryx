import { componentDef } from '@oryx-frontend/utilities';

export const multiRangeComponent = componentDef({
  name: 'oryx-multi-range',
  impl: () =>
    import('./multi-range.component').then((m) => m.MultiRangeComponent),
});
