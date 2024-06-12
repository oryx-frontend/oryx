import { Size } from '@oryx-frontend/utilities';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { storybookPrefix } from '../../../../.constants';
import { RatingProperties } from '../rating.model';

export default {
  title: `${storybookPrefix}/Graphical/Rating`,
  args: {
    scale: 5,
    characters: '',
    size: Size.Lg,
  },
  argTypes: {
    size: {
      options: [Size.Lg, Size.Sm],
      control: { type: 'radio' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const Template: Story<RatingProperties> = (
  props: RatingProperties
): TemplateResult => {
  return html`
    <oryx-rating
      scale=${ifDefined(props.scale)}
      characters=${ifDefined(props.characters)}
      size=${ifDefined(props.size)}
      @input=${console.log}
    ></oryx-rating>
  `;
};

export const EditableDemo = Template.bind({});
