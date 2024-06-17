import { HeadingAttributes } from '@oryx-frontend/ui/heading';
import { LinkType } from '@oryx-frontend/ui/link';

export interface ProductTitleOptions extends HeadingAttributes {
  linkType?: 'none' | LinkType;
}
