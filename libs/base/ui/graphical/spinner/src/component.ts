import { componentDef } from '@oryx-frontend/utilities';

export const spinnerComponent = componentDef({
  name: 'oryx-spinner',
  impl: () => import('./spinner.component').then((m) => m.SpinnerComponent),
});
