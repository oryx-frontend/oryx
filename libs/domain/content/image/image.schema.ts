import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { featureVersion } from '@oryx-frontend/utilities';
import { ContentImageComponent } from './image.component';

export const contentImageComponentSchema: ContentComponentSchema<ContentImageComponent> =
  {
    name: 'Image',
    group: 'Content',
    icon: IconTypes.Image,
    options:
      featureVersion >= '1.4'
        ? {}
        : {
            fit: {
              type: FormFieldType.Select,
              options: [
                { value: 'none' },
                { value: 'contain' },
                { value: 'cover' },
              ],
            },
            position: { type: FormFieldType.Text },
          },
    content: {
      alt: { type: FormFieldType.Text },
      link: { type: FormFieldType.Text },
      graphic: {
        label: 'Resource from preset',
        type: 'graphics',
        placeholder: 'No Graphic',
        width: 100,
      },
      image: {
        type: 'imageWidget',
        width: 100,
      },
    },
  };
