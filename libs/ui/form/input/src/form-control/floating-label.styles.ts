import { css } from 'lit';

export const floatingLabelStyles = css`
  :host([floatLabel]) {
    --float-label-start-gap: 0;

    position: relative;
  }

  :host([floatLabel]) slot[name='label']::slotted(*) {
    pointer-events: none;
  }

  :host([floatLabel]) slot[name='label'] {
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: var(--oryx-color-neutral-dark);
    position: absolute;
    top: 13px;
    inset-inline-start: calc(var(--float-label-start-gap) + 13px);
    max-width: calc(100% - 26px - var(--float-label-start-gap));
    z-index: 1;
    transition: 100ms;
    /* stylelint-disable-next-line */
    background: linear-gradient(
      to bottom,
      transparent 10px,
      var(--_label-background-color) 10px
    );
  }

  :host([floatLabel]) slot:not([name])::slotted(*)::placeholder,
  :host([floatLabel]) slot:not([name])::slotted(select:invalid) {
    opacity: 0%;
  }

  :host([floatLabel]) slot[name='label'],
  :host([floatLabel]) slot[name='label']::slotted(*) {
    cursor: text;
  }

  :host([floatLabel]:is(:focus-within, [has-value])) slot[name='label'] {
    --_label-background-color: var(--oryx-color-canvas);

    color: var(--oryx-color-neutral-darker);
    font-size: 12px;
    background-color: var(--oryx-color-canvas);
    padding: 3px 8px;
    top: -10px;
    inset-inline-start: 20px;
    max-width: calc(100% - 56px);
  }

  :host([floatLabel][has-prefix]:is(:focus-within, [has-value]))
    slot[name='label'] {
    inset-inline-start: calc(var(--float-label-start-gap) + 7px);
    max-width: calc(100% - 30px - calc(var(--float-label-start-gap)));
  }

  :host([floatLabel][has-value][disabled]) slot[name='label'] {
    --_label-background-color: var(--oryx-color-neutral-lighter);
  }

  @media (max-width: 767px) {
    :host([floatLabel]) slot[name='label'] {
      top: 17px;
    }
  }
`;
