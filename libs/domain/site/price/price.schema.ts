import { ContentComponentSchema } from '@oryx-frontend/experience';
import { SitePriceComponent } from './price.component';

export const sitePriceSchema: ContentComponentSchema<SitePriceComponent> = {
  name: 'Price',
  group: 'Site',
  icon: 'currency_exchange',
};
