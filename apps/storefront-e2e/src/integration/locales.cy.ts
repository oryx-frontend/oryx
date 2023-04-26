import { CartPage } from '../support/page_objects/cart.page';
import { LandingPage } from '../support/page_objects/landing.page';
import { ProductDetailsPage } from '../support/page_objects/product-details.page';
import { SCCOSApi } from '../support/sccos_api/sccos.api';
import { ProductStorage } from '../test-data/product.storage';

const homePage = new LandingPage();
const cartPage = new CartPage();
const pdp = new ProductDetailsPage();

describe('Locales suite', () => {
  describe('when user opens home page', () => {
    beforeEach(() => {
      homePage.visit();
    });

    it('EN is selected as a default locale', () => {
      homePage.header.getLocaleButton().should('contain.text', 'en');
      homePage.getProductCardPrices().eq(0).checkCurrencyFormatting('en');
    });

    describe('and user changes the locale to DE', () => {
      beforeEach(() => {
        homePage.header.changeLocale('de');
      });

      it('DE is applied to texts and currencies on the home page', () => {
        homePage.header.getLocaleButton().should('contain.text', 'de');
        homePage.getProductCardPrices().eq(0).checkCurrencyFormatting('de');
      });

      describe('and navigates through the website in SPA mode', () => {
        beforeEach(() => {
          // go to PDP
          homePage.getProductCards().eq(0).click();
        });

        it('DE texts and currencies are still applied', () => {
          // product description is displayed in DE
          pdp
            .getDescriptionText()
            .should(
              'contain',
              'Gear S2 X Atelier Mendini In einer wunderbaren'
            );
          pdp.getPrice().checkCurrencyFormatting('de');
          pdp.addItemsToTheCart(1);
          // go to the cart
          pdp.header.getCartSummary().click();
          checkCurrencyUsedOnCartPage('de');
        });
      });
    });
  });

  describe('when there is a product in the cart and user opens the cart page', () => {
    beforeEach(() => {
      const scosApi = new SCCOSApi();
      scosApi.guestCartItems.post(ProductStorage.getProductByEq(2), 1);
      cartPage.visit();
    });

    describe('and user changes the locale to DE', () => {
      beforeEach(() => {
        cartPage.header.changeLocale('de');
      });

      it('DE tests and currencies are applied', () => {
        checkCurrencyUsedOnCartPage('de');
      });

      describe('and user changes the locale back to EN', () => {
        beforeEach(() => {
          cartPage.header.changeLocale('en');
        });

        it('EN tests and currencies are applied', () => {
          checkCurrencyUsedOnCartPage('en');
        });
      });
    });
  });
});

function checkCurrencyUsedOnCartPage(locale: string) {
  cartPage.getCartTotals().getSubtotalPrice().checkCurrencyFormatting(locale);
  cartPage.getCartTotals().getTaxTotalPrice().checkCurrencyFormatting(locale);
  cartPage.getCartTotals().getTotalPrice().checkCurrencyFormatting(locale);

  cartPage.getCartEntries().then((entries) => {
    entries[0].getSubtotal().checkCurrencyFormatting(locale);
    entries[0].getSalesPrice().checkCurrencyFormatting(locale);
  });
}