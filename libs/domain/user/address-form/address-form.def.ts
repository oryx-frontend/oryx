import { componentDef } from '@oryx-frontend/utilities';

export const userAddressFormComponent = componentDef({
  name: 'oryx-user-address-form',
  impl: () =>
    import('./address-form.component').then((m) => m.UserAddressFormComponent),
});
