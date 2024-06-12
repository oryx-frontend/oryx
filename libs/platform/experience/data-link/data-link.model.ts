import { IconTypes } from '@oryx-frontend/ui/icon';
import { DataFieldComponentOptions } from '../src/models';

export interface DataLinkComponentOptions extends DataFieldComponentOptions {
  icon?: IconTypes;
  label?: string;
}
