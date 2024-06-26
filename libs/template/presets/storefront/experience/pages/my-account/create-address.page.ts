import { ExperienceComponent } from '@oryx-frontend/experience';
import { RouteType } from '@oryx-frontend/router';

export const createAddressPage: ExperienceComponent = {
  id: 'create-address',
  type: 'Page',
  meta: {
    title: 'Create address Page',
    routeType: RouteType.AddressBookCreate,
    route: '/my-account/addresses/create',
  },
  options: {
    rules: [{ layout: 'flex', width: '50%', margin: 'auto' }],
  },
  components: [{ type: 'oryx-user-address-edit' }],
};
