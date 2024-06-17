import { ExperienceComponent } from '@oryx-frontend/experience';
import { RouteType } from '@oryx-frontend/router';

export const editAddressPage: ExperienceComponent = {
  id: 'edit-address',
  type: 'Page',
  meta: {
    title: 'Edit address page',
    routeType: RouteType.AddressBookEdit,
    route: '/my-account/addresses/edit/:id',
  },
  options: {
    rules: [{ layout: 'flex', width: '50%', margin: 'auto' }],
  },
  components: [{ type: 'oryx-user-address-edit' }],
};
