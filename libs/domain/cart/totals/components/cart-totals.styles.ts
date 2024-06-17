import { ThemeStylesheets } from '@oryx-frontend/experience';
import { HeadingTag, headingUtil } from '@oryx-frontend/ui/heading';
import { screenCss } from '@oryx-frontend/utilities';
import { css } from 'lit';

const cartTotalRules = css`
  :host {
    display: grid;
    grid-template-columns: 1fr max-content;
    padding-inline: var(--oryx-space-4);
  }

  span,
  oryx-site-price {
    ${headingUtil(HeadingTag.H6)};

    padding-block: var(--oryx-space-2);
  }
`;

const smallScreenRules = css`
  :host {
    display: flex;
    justify-content: space-between;
    padding-inline: var(--oryx-space-4);
  }

  span,
  oryx-site-price {
    ${headingUtil(HeadingTag.H3)};
  }

  oryx-site-price {
    margin-inline-start: auto;
  }
`;

export const cartTotalsStyles: ThemeStylesheets = [
  cartTotalRules,
  ...screenCss({
    sm: smallScreenRules,
  }),
];
