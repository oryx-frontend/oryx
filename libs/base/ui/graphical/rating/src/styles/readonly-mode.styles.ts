import { Size } from '@oryx-frontend/utilities';
import { css, unsafeCSS } from 'lit';

const smallSize = unsafeCSS(`[size='${Size.Sm}']`);

export const ratingReadonlyStyles = css`
  :host([readonly]) {
    padding: var(--_margin);
  }

  :host([readonly]) fieldset {
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: calc(2 * var(--_margin));
  }

  :host([readonly]) input {
    background-color: var(--oryx-color-neutral-6);
  }

  :host([readonly]:not(${smallSize})) input {
    /* stylelint-disable-next-line */
    clip-path: url('#star-path');
  }

  :host([readonly]${smallSize}) input {
    /* stylelint-disable-next-line */
    clip-path: url('#star-path-small');
  }

  :host([readonly]) input::after {
    content: '';
    position: absolute;
    height: 100%;
    background-color: orange;
    width: min(calc(((var(--rate) - var(--pos) + 1) * 100%)), 100%);
  }

  .review-count {
    color: var(--oryx-color-neutral-9);
    line-height: var(--oryx-rating-size);
    font-size: 1rem;
  }
`;
