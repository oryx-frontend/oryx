import { HeadingTag, headingUtil } from '@oryx-frontend/ui/heading';
import { css } from 'lit';

export const cartListItemStyles = css`
  oryx-site-price {
    ${headingUtil(HeadingTag.H6)}

    margin-inline-start: auto;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-block-start: 1px solid var(--oryx-color-neutral-7);
    padding: 10px 20px;
    margin-inline: -12px;
    min-height: 40px;
    margin-block-end: -12px;
    border-end-end-radius: var(
      --oryx-collapsible-border-radius,
      var(--oryx-border-radius-small)
    );
    border-end-start-radius: var(
      --oryx-collapsible-border-radius,
      var(--oryx-border-radius-small)
    );
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-inline-start: auto;
  }

  p {
    margin-block-start: 0;
  }

  oryx-cart-entries {
    max-height: 500px;
    overflow-y: auto;
    display: block;
  }
`;
