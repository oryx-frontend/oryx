import { css } from 'lit';

export const productAttributeStyles = css`
  dl {
    column-count: var(--column-count);
    margin: 0;
  }

  dl > * {
    break-inside: avoid-column;
  }

  dd {
    break-before: avoid-column;
    margin-inline: 0;
    margin-block: 10px 20px;
    color: var(--oryx-color-neutral-9);
  }

  dd[highlight] {
    background: var(--oryx-color-primary-5);
    color: var(--oryx-color-primary-10);
    border-radius: 8px;
    padding: 1px 6px;
    margin-inline-start: -6px;
    width: fit-content;
  }
`;
