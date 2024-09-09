import { cmsTypes } from '@oryx-frontend/content';
import { ExperienceComponent } from '@oryx-frontend/experience';

export const cmsPage: ExperienceComponent[] = cmsTypes.map((type) => ({
  type: 'Page',
  id: type,
  meta: {
    title: type,
    route: `/${type}/:id`,
    routeType: type,
  },
  components: [
    { ref: 'header' },
    {
      type: 'oryx-composition',
      options: {
        rules: [{ layout: { type: 'split' }, padding: '30px 0' }],
      },
      components: [
        {
          type: 'oryx-site-breadcrumb',
          options: { rules: [{ colSpan: 2 }] },
        },
        {
          type: 'oryx-data-text',
          options: {
            field: 'content',
          },
        },
      ],
    },
    { ref: 'footer' },
  ],
}));
