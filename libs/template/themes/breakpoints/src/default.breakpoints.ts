import { Breakpoints, Size } from '@oryx-frontend/utilities';

export const defaultBreakpoints: Breakpoints = {
  [Size.Sm]: {
    max: 767,
  },
  [Size.Md]: {
    min: 768,
    max: 1023,
  },
  [Size.Lg]: {
    min: 1024,
  },
};
