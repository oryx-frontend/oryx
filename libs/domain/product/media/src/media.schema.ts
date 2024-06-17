import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { LoadingStrategy } from '@oryx-frontend/ui/image';
import { ProductMediaContainerSize } from '../../src/models';
import { ProductMediaComponent } from './media.component';

export const productMediaSchema: ContentComponentSchema<ProductMediaComponent> =
  {
    name: 'Product Media',
    group: 'Product',
    icon: IconTypes.Media,
    options: {
      mediaSet: { type: FormFieldType.Text },
      mediaIndex: { type: FormFieldType.Number },
      alt: { type: FormFieldType.Text },
      loading: {
        type: FormFieldType.Select,
        options: [
          { value: LoadingStrategy.Eager },
          { value: LoadingStrategy.Lazy },
        ],
      },
      containerSize: {
        type: FormFieldType.Select,
        options: [
          { value: ProductMediaContainerSize.Icon },
          { value: ProductMediaContainerSize.Thumbnail },
          { value: ProductMediaContainerSize.Detail },
          { value: ProductMediaContainerSize.Full },
        ],
      },
    },
  };
