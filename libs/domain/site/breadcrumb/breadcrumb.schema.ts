import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { i18n, iconInjectable } from '@oryx-frontend/utilities';
import { SiteBreadcrumbComponent } from './breadcrumb.component';

const icons =
  iconInjectable
    .get()
    ?.getIcons()
    .sort()
    .map((i) => ({ value: i, text: i })) ?? [];

export const siteBreadcrumbSchema: ContentComponentSchema<SiteBreadcrumbComponent> =
  {
    name: 'Breadcrumb',
    group: 'Site',
    icon: IconTypes.Link,
    options: {
      divider: {
        type: FormFieldType.Select,
        options: [{ value: '', text: i18n('icon.without-icon') }, ...icons],
      },
    },
  };
