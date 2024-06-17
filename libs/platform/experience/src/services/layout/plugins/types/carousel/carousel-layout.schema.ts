import {
  CarouselIndicatorAlignment,
  CarouselIndicatorPosition,
  ContentComponentSchema,
} from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { ArrowNavigationBehavior } from './carousel-layout.model';
export const schema: ContentComponentSchema = {
  name: 'carousel',
  group: 'layout',
  options: {
    showArrows: { type: FormFieldType.Boolean },
    showIndicators: { type: FormFieldType.Boolean },
    indicatorsPosition: {
      type: FormFieldType.Select,
      options: [
        { value: CarouselIndicatorPosition.Below },
        { value: CarouselIndicatorPosition.Bottom },
      ],
    },
    indicatorsAlignment: {
      type: FormFieldType.Select,
      options: [
        { value: CarouselIndicatorAlignment.Start },
        { value: CarouselIndicatorAlignment.Center },
        { value: CarouselIndicatorAlignment.End },
      ],
    },
    arrowNavigationBehavior: {
      type: FormFieldType.Select,
      options: [
        { value: ArrowNavigationBehavior.Slide },
        { value: ArrowNavigationBehavior.Item },
      ],
    },
    scrollWithMouse: { type: FormFieldType.Boolean },
    scrollWithTouch: { type: FormFieldType.Boolean },
  },
};
