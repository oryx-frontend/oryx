import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { LinkType } from '@oryx-frontend/ui/link';
import { ProductTitleComponent } from './title.component';

const tagOptions = [
  HeadingTag.H1,
  HeadingTag.H2,
  HeadingTag.H3,
  HeadingTag.H4,
  HeadingTag.H5,
  HeadingTag.H6,
  HeadingTag.Subtitle,
  HeadingTag.Caption,
].map((tag) => ({ value: tag }));

export const productTitleSchema: ContentComponentSchema<ProductTitleComponent> =
  {
    name: 'Product title',
    group: 'Product',
    icon: IconTypes.Title,
    options: {
      tag: { type: FormFieldType.Select, options: tagOptions },
      maxLines: { type: FormFieldType.Number },
      linkType: {
        type: FormFieldType.Select,
        options: [
          { value: 'none' },
          { value: LinkType.Link },
          { value: LinkType.ExternalLink },
          { value: LinkType.Neutral },
        ],
        width: 100,
      },
      as: {
        type: FormFieldType.Select,
        options: [...tagOptions, { value: 'hide' }],
      },
      asLg: {
        type: FormFieldType.Select,
        options: [...tagOptions, { value: 'hide' }, { value: 'show' }],
      },
      asMd: {
        type: FormFieldType.Select,
        options: [...tagOptions, { value: 'hide' }, { value: 'show' }],
      },
      asSm: {
        type: FormFieldType.Select,
        options: [...tagOptions, { value: 'hide' }, { value: 'show' }],
      },
    },
  };
