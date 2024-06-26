import { ThemeStylesheets } from '@oryx-frontend/experience';
import { HeadingTag, headingUtil } from '@oryx-frontend/ui/heading';
import { css } from 'lit';

const cartDeliveryTotalRules = css`
  .unknown-message {
    ${headingUtil(HeadingTag.H6)};

    flex: 100%;
    color: var(--oryx-color-neutral-9);
  }

  .free {
    color: var(--oryx-color-highlight-10);
  }
`;

export const cartDeliveryTotalStyles: ThemeStylesheets = [
  cartDeliveryTotalRules,
];
