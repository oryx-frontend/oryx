import { CartPage } from '../support/page_objects/cart.page';
import { LandingPage } from '../support/page_objects/landing.page';
import { ProductDetailsPage } from '../support/page_objects/product-details.page';
import { SCCOSApi } from '../support/sccos_api/sccos.api';
import { ProductStorage } from '../test-data/product.storage';

const homePage = new LandingPage();
const cartPage = new CartPage();
const pdp = new ProductDetailsPage();

describe('Currencies suite', () => {
  describe('when user opens home page', () => {
    beforeEach(() => {
      homePage.visit();
    });

    it('EUR is selected as a default currency', () => {
      homePage.header.getCurrencyButton().should('contain.text', 'EUR');
      // and all prices on home page are displayed in EUR
      homePage.getProductCardPrices().should('contain.text', '€');
    });

    describe('and user changes the currency to CHF', () => {
      beforeEach(() => {
        homePage.header.changeCurrency('CHF');
      });

      it('CHF is applied to prices on the home page', () => {
        homePage.header.getCurrencyButton().should('contain.text', 'CHF');
        // and all prices on home page are displayed in CHF
        homePage.getProductCardPrices().should('contain.text', 'CHF');
      });

      describe('and navigates through the website in SPA mode', () => {
        beforeEach(() => {
          // go to PDP
          homePage.getProductCards().eq(0).click();
        });

        it('CHF price is still applied', () => {
          // product price is displayed in CHF
          pdp.getPrice().should('contain.text', 'CHF');
          pdp.addItemsToTheCart(1);
          // go to the cart
          pdp.header.getCartSummary().click();
          checkCurrencyOnCartPage('CHF');
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

    describe('and user changes the currency to CHF', () => {
      beforeEach(() => {
        cartPage.header.changeCurrency('CHF');
      });

      it('CHF prices are applied on the cart page', () => {
        checkCurrencyOnCartPage('CHF');
      });

      describe('and user changes the currency back to EUR', () => {
        beforeEach(() => {
          cartPage.header.changeCurrency('EUR');
        });

        it('EUR prices are applied on the cart page', () => {
          checkCurrencyOnCartPage('€');
        });
      });
    });
  });
});

function checkCurrencyOnCartPage(currency: string) {
  cartPage.getCartTotals().getSubtotalPrice().should('contain.text', currency);
  cartPage.getCartTotals().getTaxTotalPrice().should('contain.text', currency);
  cartPage.getCartTotals().getTotalPrice().should('contain.text', currency);

  cartPage.getCartEntries().then((entries) => {
    entries[0].getSubtotal().should('contain.text', currency);
    entries[0].getSalesPrice().should('contain.text', currency);
  });
}