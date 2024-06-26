import { ExperienceComponent } from '@oryx-frontend/experience';
import { featureVersion } from '@oryx-frontend/utilities';
import {
  categoryNavigation,
  mainHeader,
  topHeader,
} from '../../storefront/experience/header';

export const HeaderTemplate: ExperienceComponent = {
  id: 'header',
  type: 'oryx-composition',
  components: [
    ...topHeader({ priceModeSelector: true }),
    ...mainHeader(),
    ...(featureVersion >= '1.3'
      ? categoryNavigation(
          featureVersion >= '1.4' ? '35,38' : ['2', '11', '23', '31']
        )
      : []),
  ],
};
