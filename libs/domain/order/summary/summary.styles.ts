import { featureVersion, screenCss } from '@oryx-frontend/utilities';
import { css, unsafeCSS } from 'lit';

export const orderSummaryStyles = css`
  :host {
    display: flex;
    flex-wrap: wrap;
  }

  :host > :not(:is(oryx-heading + section, oryx-button)) {
    flex-basis: 100%;
  }

  :host > oryx-heading + section {
    align-items: center;
    grid-template-columns: 20px max-content auto;
    gap: 8px 6px;
  }

  ${featureVersion >= '1.4'
    ? unsafeCSS(
        'oryx-heading[title] {margin-block-end: 32px;}oryx-heading:not([title]) {margin-block-end: 4px;}'
      )
    : unsafeCSS('h2 {margin-block-end: 32px; h3 {margin-block-end: 4px;}}')}

  section {
    gap: 8px;
    display: grid;
    grid-template-columns: max-content auto;
    flex: 1;
  }

  oryx-button {
    align-self: end;
    margin-inline-start: 17px;
  }

  oryx-button button {
    flex: initial;
  }

  .title {
    font-weight: 600;
  }

  hr,
  oryx-heading {
    grid-column: 1 / 3;
  }

  hr {
    border: none;
    border-block-start: 1px solid var(--oryx-color-neutral-4);
    margin: 20px 0;
    outline: none;
  }

  oryx-icon {
    color: var(--oryx-color-neutral-9);
  }
`;

const smallScreen = css`
  :host {
    flex-direction: column;
  }

  oryx-button {
    align-self: start;
    margin: 0;
    margin-block-start: 17px;
  }
`;

export const screenStyles = screenCss({
  sm: smallScreen,
});
