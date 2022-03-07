import { storybookPrefix } from '../../../constant';
import '../../../option/src/index';
import { FilterStrategyType } from '../../../typeahead';
import { branches, sideBySide, states } from '../../../utilities/storybook/';
import '../index';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

export default {
  title: `${storybookPrefix}/form/Select/filter`,
} as Meta;

interface Props {
  dataSet: string;
  filterStrategy: FilterStrategyType;
}

const Template: Story<Props> = ({
  dataSet,
  filterStrategy,
}: Props): TemplateResult => {
  const compOptions = { filter: true, filterStrategy };

  const data: string[] = dataSet === 'branches' ? branches : states;

  return sideBySide(html`
    <oryx-select .options=${compOptions}>
      <input value="m" placeholder="filter the list by typing" />
      ${data.map(
        (option) => html`<oryx-option .value=${option}></oryx-option>`
      )}
    </oryx-select>
  `);
};

export const Contains = Template.bind({});

Contains.args = {
  dataSet: 'states',
  filterStrategy: FilterStrategyType.CONTAINS,
};
Contains.argTypes = {
  filterStrategy: {
    options: [
      FilterStrategyType.START_WITH,
      FilterStrategyType.START_OF_WORD,
      FilterStrategyType.CONTAINS,
    ],
    control: { type: 'select' },
  },
  dataSet: {
    options: ['states', 'branches'],
    control: { type: 'select' },
  },
};