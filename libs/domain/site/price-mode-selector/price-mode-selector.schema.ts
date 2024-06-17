import { ContentComponentSchema } from '@oryx-frontend/experience';
import { SitePriceModeSelectorComponent } from './price-mode-selector.component';

export const sitePriceModeSelectorSchema: ContentComponentSchema<SitePriceModeSelectorComponent> =
  {
    name: 'Price mode selector',
    group: 'Site',
    icon: 'euro',
  };
