import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { SiteJsonLdComponent } from './jsonld.component';

export const siteJsonLdSchema: ContentComponentSchema<SiteJsonLdComponent> = {
  name: 'Json LD (structured data)',
  group: 'Site',
  icon: 'schema',
  options: {
    serverOnly: {
      type: FormFieldType.Boolean,
    },
  },
};
