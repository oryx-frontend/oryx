import { AppFeature } from '@spryker-oryx/core';
import { productAttributesComponent } from '../attributes/src/component';
import { productAverageRatingComponent } from '../average-rating/src/component';
import { productCardComponent } from '../card/src/component';
import { productDescriptionComponent } from '../description/src/component';
import { productIdComponent } from '../id/src/component';
import { productImagesComponent } from '../images/src/component';
import { productMediaComponent } from '../media/src/component';
import { productPriceComponent } from '../price/src/component';
import { productTitleComponent } from '../title/src/component';
import { productProviders } from './services';

export const productFeature: AppFeature = {
  providers: productProviders,
  components: [
    productAttributesComponent,
    productAverageRatingComponent,
    productCardComponent,
    productDescriptionComponent,
    productIdComponent,
    productImagesComponent,
    productMediaComponent,
    productPriceComponent,
    productTitleComponent,
  ],
};
