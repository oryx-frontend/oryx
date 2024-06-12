import { HeadingTag } from '@oryx-frontend/ui/heading';
import { DataFieldComponentOptions } from '../src/models';

export interface DataTextComponentOptions extends DataFieldComponentOptions {
  tag?: HeadingTag;
  prefix?: string;
  link?: boolean;
}
