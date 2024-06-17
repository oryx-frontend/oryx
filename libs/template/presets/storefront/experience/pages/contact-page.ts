import { ExperienceComponent } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { featureVersion } from '@oryx-frontend/utilities';

export const contactPage: ExperienceComponent = {
  id: 'contact-page',
  type: 'Page',
  meta: {
    title: 'Contact Page',
    route: '/contact',
    description: 'Contact Page Description',
  },
  components: [
    featureVersion >= '1.2'
      ? {
          ref: 'header',
        }
      : {},
    {
      type: 'oryx-composition',
      components: [
        {
          type: 'oryx-site-breadcrumb',
          options: {
            rules: [{ colSpan: 2 }],
          },
        },
        {
          type: 'oryx-content-link',
          content: {
            data: {
              text: 'This is Contact Page element. Remove me when the page is implemented',
            },
          },
          options: {
            type: 'rawUrl',
            url: '/contact',
            icon: IconTypes.Check,
            rules: [
              {
                layout: 'list',
                padding: '10px',
                background: 'var(--oryx-color-primary-3)',
              },
            ],
          },
        },
      ],
      options: {
        rules: [
          {
            layout: 'list',
            padding: '30px 0',
          },
        ],
      },
    },
    featureVersion >= '1.2'
      ? {
          ref: 'footer',
        }
      : {},
  ],
};
