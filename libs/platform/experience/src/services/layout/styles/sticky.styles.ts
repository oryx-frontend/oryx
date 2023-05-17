import { css } from 'lit';
import { LayoutStyles } from '../layout.model';

export const styles: LayoutStyles = {
  styles: css`
    :host,
    ::slotted([class*='sticky']) {
      position: sticky;
      inset-block-start: 0;
    }
  `,
};

// max-height: calc(var(--height, 100vh) - var(--top, 0px));