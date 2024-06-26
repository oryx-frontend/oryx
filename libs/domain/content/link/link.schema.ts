import { ContentComponentSchema } from '@oryx-frontend/experience';
import {
  ContentSuggestionFieldOptions,
  ContentSuggestionFieldType,
} from '@oryx-frontend/experience/composition';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ColorType } from '@oryx-frontend/ui/link';
import { iconInjectable } from '@oryx-frontend/utilities';
import { ContentLinkComponent } from './link.component';

/**
 * @deprecated since 1.4 use ContentSuggestionFieldType from @oryx-frontend/experience.
 */
export const ContentSuggestionField = 'ContentSuggestion';

export const linkComponentSchema: ContentComponentSchema<
  ContentLinkComponent,
  ContentSuggestionFieldOptions
> = {
  name: 'Link',
  group: 'Content',
  icon: IconTypes.Link,
  options: {
    [ContentSuggestionFieldType]: {
      type: ContentSuggestionFieldType,
      width: 100,
    },
    url: { type: FormFieldType.Text },
    target: {
      type: FormFieldType.Select,
      options: [
        {
          value: '_blank',
          text: '_blank',
        },
        {
          value: '_self',
          text: '_self',
        },
        {
          value: '_parent',
          text: '_parent',
        },
        {
          value: '_top',
          text: '_top',
        },
      ],
    },
    color: {
      type: FormFieldType.Select,
      options: [{ value: ColorType.Primary }, { value: ColorType.Neutral }],
    },
    icon: {
      type: FormFieldType.Select,
      options:
        iconInjectable
          .get()
          ?.getIcons()
          .sort()
          .map((i) => ({ value: i, text: i })) ?? [],
    },
    noopener: { type: FormFieldType.Boolean },
    nofollow: { type: FormFieldType.Boolean },
    singleLine: { type: FormFieldType.Boolean },
  },
  content: { text: { type: FormFieldType.Text } },
};
