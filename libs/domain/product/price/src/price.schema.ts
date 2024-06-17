import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductPriceComponent } from './price.component';

export const productPriceSchema: ContentComponentSchema<ProductPriceComponent> =
  {
    name: 'Product Price',
    group: 'Product',
    icon: IconTypes.Price,
    options: {
      enableOriginalPrice: { type: FormFieldType.Boolean },
      enableSalesLabel: { type: FormFieldType.Boolean },
      enableTaxMessage: { type: FormFieldType.Boolean },
    },
  };
