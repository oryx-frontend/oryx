import { css } from 'lit';

export const chipBaseStyle = css`
  :host {
    display: inline-block;
    padding-inline: 12px;
    line-height: 24px;
    flex-grow: 0;
    flex-shrink: 0;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: var(--oryx-chip-color, #71747c);
    background-color: var(--oryx-chip-background-color, #efeeee);
  }

  :host([dense]) {
    padding-inline: 7px;
  }
`;
