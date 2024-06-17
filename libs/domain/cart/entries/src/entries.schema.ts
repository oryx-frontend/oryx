import { ContentComponentSchema } from '@oryx-frontend/experience';
import { cartEntryComponentSchema } from '../../entry/src/entry.schema';
import { CartEntriesComponent } from './entries.component';

export const cartEntriesComponentSchema: ContentComponentSchema<CartEntriesComponent> =
  {
    ...cartEntryComponentSchema,
    name: 'Cart Entries',
  };
