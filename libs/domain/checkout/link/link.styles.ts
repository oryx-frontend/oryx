import { screenCss } from '@oryx-frontend/utilities';
import { css } from 'lit';

export const checkoutLinkStyles = css`
  oryx-button {
    display: flex;
  }
`;

const smallScreen = css`
  :host {
    display: block;
    position: sticky;
    inset-block-end: 0;
    padding: 10px;
    background: var(--oryx-color-neutral-1);
  }
`;

export const checkoutLinkScreenStyles = screenCss({
  sm: smallScreen,
});
