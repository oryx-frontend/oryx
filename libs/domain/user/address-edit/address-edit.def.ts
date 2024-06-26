import { componentDef } from '@oryx-frontend/utilities';

export const addressEditComponent = componentDef({
  name: 'oryx-user-address-edit',
  impl: () =>
    import('./address-edit.component').then((m) => m.UserAddressEditComponent),

  schema: () =>
    import('./address-edit.schema').then((m) => m.userAddressEditSchema),
});
