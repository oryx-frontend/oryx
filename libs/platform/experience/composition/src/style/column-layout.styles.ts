import { Breakpoint } from '@spryker-oryx/experience';
import { css, CSSResult } from 'lit';
import { selector } from './utils';

/**
 * Allows to render composition items in a single column. Column items
 * will not wrap to the next line and can have custom widths.
 *
 * The item width added inline in each composition item but default
 * (by browser nature) to a `flex: auto`, which means that they are equally
 * divided over the horizontal axis.
 */
export const columnLayout = (breakpoint?: Breakpoint): CSSResult => css`
  :host(.${selector('layout-column', breakpoint)}) {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    flex-direction: row;
  }
`;