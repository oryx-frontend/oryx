import { css } from 'lit';

export const iconButtonStyles = css`
  :host {
    color: var(--oryx-icon-button-color, var(--oryx-color-neutral-dark));
  }

  ::slotted(*) {
    display: flex;
    flex: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--oryx-transition-time);
    background: var(--oryx-color-canvas);
    outline: none;
    border: solid var(--oryx-color-canvas) 1px;
    border-radius: 50%;
    color: inherit;
  }

  ::slotted(:hover:not([disabled])) {
    border-color: var(--oryx-color-neutral);
    background: var(--oryx-color-neutral-lighter);
  }

  ::slotted(:focus-visible:not(:active):not([disabled])) {
    border-color: var(--oryx-color-canvas);
    box-shadow: 0 0 4px var(--oryx-color-focus);
  }

  ::slotted(:focus-visible:hover:not(:active):not([disabled])) {
    border-color: var(--oryx-color-neutral-lighter);
  }

  ::slotted(:active:not([disabled])) {
    border-color: var(--oryx-color-neutral-dark);
    background: var(--oryx-color-neutral-lighter);
  }

  ::slotted([disabled]) {
    cursor: default;
    color: var(--oryx-color-neutral);
    border-color: var(--oryx-color-neutral-light);
    background: var(--oryx-color-neutral-lighter);
  }

  :host([size='small']) ::slotted(*) {
    --oryx-icon-size: var(--oryx-icon-size-small);

    padding: 5px;
  }

  :host([size='medium']) ::slotted(*),
  ::slotted(*) {
    --oryx-icon-size: var(--oryx-icon-size-medium);

    padding: 10px;
  }

  :host([size='large']) ::slotted(*) {
    --oryx-icon-size: var(--oryx-icon-size-large);

    padding: 11px;
  }
`;