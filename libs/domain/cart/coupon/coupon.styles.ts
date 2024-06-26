import { HeadingTag, headingUtil } from '@oryx-frontend/ui/heading';
import { css } from 'lit';

export const couponStyles = css`
  :host {
    display: grid;
    gap: 8px;
  }

  div {
    display: grid;
    column-gap: 10px;
    align-items: center;
    grid-template-columns: max-content 1fr;
  }

  .code {
    ${headingUtil(HeadingTag.Caption)};

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    grid-column: 2;
    color: var(--oryx-color-neutral-9);
  }

  oryx-button:not([icon]) {
    --_height: 24px;
  }

  oryx-icon {
    --oryx-icon-color: var(--oryx-color-success-9);
  }
`;
