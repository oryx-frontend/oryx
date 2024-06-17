import { AppFeature } from '@oryx-frontend/core';
import { provideExperienceData } from '@oryx-frontend/experience';
import { featureVersion } from '@oryx-frontend/utilities';
import { FooterTemplate } from './footer';
import { HeaderTemplate } from './header';
import {
  addressBookPage,
  cartCreatePage,
  cartPage,
  cartsPage,
  categoryPage,
  checkoutPage,
  contactPage,
  createAddressPage,
  editAddressPage,
  homePage,
  loginPage,
  orderConfirmationPage,
  productPage,
  registrationPage,
  searchPage,
} from './pages';

export const StaticExperienceFeature: AppFeature = {
  providers: [
    provideExperienceData([
      HeaderTemplate,
      FooterTemplate,
      cartPage,
      categoryPage,
      checkoutPage,
      contactPage,
      homePage,
      loginPage,
      orderConfirmationPage,
      productPage,
      searchPage,
      addressBookPage,
      createAddressPage,
      editAddressPage,
      ...(featureVersion >= '1.1' ? [registrationPage] : []),
      ...(featureVersion >= '1.4' ? [cartsPage, cartCreatePage] : []),
    ]),
  ],
};
