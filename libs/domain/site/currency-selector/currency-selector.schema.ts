import { ContentComponentSchema } from '@oryx-frontend/experience';
import { SiteCurrencySelectorComponent } from './currency-selector.component';

export const siteCurrencySelectorSchema: ContentComponentSchema<SiteCurrencySelectorComponent> =
  {
    name: 'Currency selector',
    group: 'Site',
    icon: 'euro',
  };
