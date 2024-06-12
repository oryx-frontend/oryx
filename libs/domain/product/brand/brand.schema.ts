import { ContentComponentSchema } from '@oryx-frontend/experience';
import { ProductBrandComponent } from './brand.component';

export const productBrandSchema: ContentComponentSchema<ProductBrandComponent> =
  {
    name: 'Product Brand',
    group: 'Product',
    icon: 'diamond',
  };
