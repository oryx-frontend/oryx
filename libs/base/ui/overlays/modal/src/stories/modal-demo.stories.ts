import { CardType } from '@spryker-oryx/ui/card';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default { title: `${storybookPrefix}/Overlays/Modal` } as Meta;

interface Props {
  withoutCloseButton: boolean;

  firstModalFullscreen?: boolean;
  secondModalFullscreen?: boolean;

  firstModalHeader?: string;
  secondModalHeader?: string;

  firstModalContent?: string;
  secondModalContent?: string;

  firstModalType?: CardType;
  secondModalType?: CardType;

  firstModalpreventCloseWithBackdrop?: boolean;
  secondModalpreventCloseWithBackdrop?: boolean;

  firstModalpreventCloseWithEscape?: boolean;
  secondModalpreventCloseWithEscape?: boolean;
}

const generateContent = (times: number): TemplateResult => html`
  ${[...Array(times).keys()].map((i) => html` <p>${i}</p> `)}
`;

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`
    <script>
      (() => {
        const openFirstModalBtn = document.querySelector('#openFirstModalBtn');
        const openSecondModalBtn = document.querySelector(
          '#openSecondModalBtn'
        );

        const firstModal = document.querySelector('oryx-modal');
        const secondModal = document.querySelectorAll('oryx-modal')[1];

        openFirstModalBtn?.addEventListener('click', () => {
          firstModal?.open();
        });

        openSecondModalBtn?.addEventListener('click', () => {
          secondModal?.open();
        });
      })();
    </script>

    <button id="openFirstModalBtn">Open first modal</button>
    ${generateContent(20)}

    <oryx-modal
      ?withoutCloseButton=${props.withoutCloseButton}
      ?preventCloseWithEscape=${props.firstModalpreventCloseWithEscape}
      ?preventCloseWithBackdrop=${props.firstModalpreventCloseWithBackdrop}
      ?fullscreen=${props.firstModalFullscreen}
      header=${props.firstModalHeader}
      type=${props.firstModalType}
      @oryx.close=${console.log}
    >
      <div>
        <p>${props.firstModalContent}</p>
        <button id="openSecondModalBtn">Open second modal</button>

        <oryx-modal
          ?withoutCloseButton=${props.withoutCloseButton}
          ?preventCloseWithEscape=${props.secondModalpreventCloseWithEscape}
          ?preventCloseWithBackdrop=${props.secondModalpreventCloseWithBackdrop}
          ?fullscreen=${props.secondModalFullscreen}
          header=${props.secondModalHeader}
          type=${props.secondModalType}
        >
          ${props.secondModalContent}
        </oryx-modal>
      </div>
    </oryx-modal>
  `;
};

export const ModalDemo = Template.bind({});

ModalDemo.args = {
  withoutCloseButton: false,
  firstModalFullscreen: false,
  secondModalFullscreen: false,
  firstModalpreventCloseWithBackdrop: false,
  secondModalpreventCloseWithBackdrop: false,
  firstModalpreventCloseWithEscape: false,
  secondModalpreventCloseWithEscape: false,
  firstModalHeader: 'First modal header',
  secondModalHeader: 'Second modal header',
  firstModalContent:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel pharetra lacus. Fusce interdum venenatis nulla quis euismod. Maecenas ante ante, gravida at dolor nec, efficitur finibus tellus. Sed eu erat bibendum, semper nulla quis, sagittis augue. Vestibulum mattis ullamcorper purus rutrum sollicitudin. Nunc ac elementum nisi. Suspendisse sed ligula vitae tortor placerat condimentum. Nullam pretium sit amet nisi a scelerisque. Mauris vitae dictum justo. Ut at ex gravida tellus convallis accumsan at ac nulla. Praesent scelerisque, tortor a mollis imperdiet, velit purus posuere nisi, et pretium massa eros volutpat nisi. Nullam eget auctor orci, eget dapibus ipsum. Pellentesque ante elit, egestas vitae laoreet ut, ullamcorper ac tortor. Quisque condimentum elit at est finibus pharetra.',
  secondModalContent:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
};

ModalDemo.argTypes = {
  firstModalFullscreen: {
    table: { category: 'First modal' },
    control: { type: 'boolean' },
  },
  secondModalFullscreen: {
    table: { category: 'Second modal' },
    control: { type: 'boolean' },
  },
  firstModalpreventCloseWithBackdrop: {
    table: { category: 'First modal' },
    control: { type: 'boolean' },
  },
  secondModalpreventCloseWithBackdrop: {
    table: { category: 'Second modal' },
    control: { type: 'boolean' },
  },
  firstModalpreventCloseWithEscape: {
    table: { category: 'First modal' },
    control: { type: 'boolean' },
  },
  secondModalpreventCloseWithEscape: {
    table: { category: 'Second modal' },
    control: { type: 'boolean' },
  },
  firstModalHeader: {
    table: { category: 'First modal' },
    control: { type: 'text' },
  },
  secondModalHeader: {
    table: { category: 'Second modal' },
    control: { type: 'text' },
  },
  firstModalContent: {
    table: { category: 'First modal' },
    control: { type: 'text' },
  },
  secondModalContent: {
    table: { category: 'Second modal' },
    control: { type: 'text' },
  },
};

ModalDemo.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};