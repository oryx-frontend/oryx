import { ExperienceComponent } from '@oryx-frontend/experience';
import { RouteType } from '@oryx-frontend/router';
import { EditTarget } from '@oryx-frontend/user/address-list-item';

export const addressBookPage: ExperienceComponent = {
  id: 'address-book',
  type: 'Page',
  meta: {
    title: 'Address book',
    routeType: RouteType.AddressList,
    route: '/my-account/addresses',
  },
  options: {
    rules: [
      { layout: 'flex', padding: '30px 0', width: '50%', margin: 'auto' },
    ],
  },
  components: [
    {
      type: 'oryx-user-address-list',
      options: {
        editable: true,
        removable: true,
        editTarget: EditTarget.Link,
      },
    },
    {
      type: 'oryx-user-address-add-button',
      options: { target: 'link' },
    },
  ],
};
