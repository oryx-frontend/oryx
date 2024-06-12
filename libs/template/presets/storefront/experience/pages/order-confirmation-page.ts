import { ExperienceComponent } from '@oryx-frontend/experience';
import { RouteType } from '@oryx-frontend/router';
import { featureVersion } from '@oryx-frontend/utilities';

const orderEntries = (): ExperienceComponent => {
  if (featureVersion >= '1.2')
    return {
      type: 'oryx-composition',
      components: [
        { type: 'oryx-order-heading' },
        { type: 'oryx-order-entries' },
      ],
      options: {
        rules: [{ layout: 'list', gap: 0 }],
      },
    };

  return { type: 'oryx-order-entries' };
};

export const orderConfirmationPage: ExperienceComponent = {
  id: 'order-confirmation-page',
  type: 'Page',
  meta: {
    title: 'Order Confirmation Page',
    route: '/order/:id',
    routeType: RouteType.Order,
    description: 'Order Page Description',
  },
  components: [
    featureVersion >= '1.2'
      ? {
          ref: 'header',
        }
      : {},
    { type: 'oryx-order-confirmation-banner' },
    {
      type: 'oryx-composition',
      id: 'order-totals',
      options: {
        rules: [
          {
            layout:
              featureVersion >= '1.2'
                ? { type: 'split', columnWidthType: 'main' }
                : 'split-main',
            padding: '30px 0 0',
          },
        ],
      },
      components: [
        {
          type: 'oryx-order-summary',
        },
        {
          type: 'oryx-order-totals',
          options: {
            rules: [{ hideByRule: 'USER.!AUTHENTICATED' }],
          },
          components: [
            { type: 'oryx-cart-totals-subtotal' },
            { type: 'oryx-cart-totals-discount' },
            { type: 'oryx-cart-totals-tax' },
            { type: 'oryx-cart-totals-delivery' },
            { type: 'oryx-cart-totals-total' },
          ],
        },
        orderEntries(),
      ],
    },
    featureVersion >= '1.2'
      ? {
          ref: 'footer',
        }
      : {},
  ],
};
