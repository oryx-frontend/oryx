import { Icons } from '@oryx-frontend/ui/icon';
import { Size } from '@oryx-frontend/utilities';

export interface SpinnerProperties {
  icon?: Icons | string;
  rotation?: SpinnerRotation;
  size?: Size;
}

export enum SpinnerRotation {
  ClockWise = 'clockwise',
  AntiClockWise = 'anticlockwise',
}
