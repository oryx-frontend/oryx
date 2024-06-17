import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductIdComponent } from './id.component';

export const productIdSchema: ContentComponentSchema<ProductIdComponent> = {
  name: 'Product Id',
  group: 'Product',
  icon: IconTypes.Barcode,
  options: { prefix: { type: FormFieldType.Text } },
};
