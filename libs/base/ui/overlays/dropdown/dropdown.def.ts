import { componentDef } from '@oryx-frontend/utilities';

export const dropdownComponent = componentDef({
  name: 'oryx-dropdown',
  impl: () => import('./dropdown.component').then((m) => m.DropdownComponent),
});
