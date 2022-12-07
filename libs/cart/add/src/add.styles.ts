import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 17px;
  }

  form {
    display: contents;
  }

  oryx-button {
    flex: auto;
  }

  button {
    --oryx-icon-size: 24px;

    height: 28px;
  }
`;