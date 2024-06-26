import { CARTS } from '@oryx-frontend/cart';
import { ExperienceComponent } from '@oryx-frontend/experience';
import { Size } from '@oryx-frontend/utilities';

export const cartsPage: ExperienceComponent = {
  id: 'carts-page',
  type: 'Page',
  meta: {
    title: 'Carts',
    route: '/my-account/carts',
    description: 'Carts Page',
    routeType: CARTS,
  },
  components: [
    { ref: 'header' },
    {
      type: 'oryx-composition',
      options: { rules: [{ layout: 'list', padding: '30px 0' }] },
      components: [
        {
          type: 'oryx-site-breadcrumb',
          options: { rules: [{ query: { breakpoint: Size.Sm }, hide: true }] },
        },
        { ref: 'carts-page-content' },
      ],
    },
    { ref: 'footer' },
  ],
};
