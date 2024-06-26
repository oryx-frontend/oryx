import { featureVersion } from '@oryx-frontend/utilities';
import { css } from 'lit';
import { LayoutStyles } from '../../../layout.model';

export const styles: LayoutStyles = {
  styles: css`
    :host {
      display: flex;
      align-items: var(--align, start);
      justify-content: var(--justify, start);
      ${featureVersion >= `1.3`
        ? css``
        : css`
            flex-wrap: wrap;
          `}
      ${featureVersion >= `1.4`
        ? css`
            flex: auto;
          `
        : css``}
    }

    *,
    ::slotted(*) {
      justify-self: var(--justify);
      align-self: var(--align);
    }
  `,
};

export const verticalStyles: LayoutStyles = {
  styles: css`
    :host {
      flex-direction: column;
      align-items: var(--align, stretch);
      justify-content: var(--justify, flex-start);
    }
  `,
};
