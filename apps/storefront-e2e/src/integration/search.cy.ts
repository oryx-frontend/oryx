import {
  checkProductCardsFilteringByName,
  checkProductCardsFilteringByPrice,
  checkProductCardsSortingBySku,
} from '../support/checks';
import { SearchPage } from '../support/page-objects/search.page';
import { sortingTestData } from '../support/test-data/search-products';

describe('Search suite', () => {
  let searchPage;

  describe('Products filtering', () => {
    describe('by value facets', () => {
      const query = 'Canon';

      beforeEach(() => {
        searchPage = new SearchPage({ q: query });
        searchPage.visit();
      });

      it('should update products and facets when filters are applied/cleared', () => {
        searchPage.getFacets().setRating('4');
        searchPage.waitForSearchRequest();
        checkProductCardsFilteringByName(searchPage, 2, 1, query);

        // we don't expect search request here because previous query is cached
        searchPage.getFacets().resetRating();

        // apply 1st filter
        searchPage.getFacets().setLabel('New');
        searchPage.waitForSearchRequest();
        checkProductCardsFilteringByName(searchPage, 4, 2, query);

        // apply 2nd filter
        searchPage.getFacets().setColor('Black');
        searchPage.waitForSearchRequest();
        checkProductCardsFilteringByName(searchPage, 4, 1, query);

        // clear 2nd filter
        // we don't expect search request here because previous query is cached
        searchPage.getFacets().resetColor();
        checkProductCardsFilteringByName(searchPage, 4, 2, query);
      });
    });

    describe('by price', () => {
      const minPrice = 200;
      const maxPrice = 400;

      beforeEach(() => {
        // set brand to limit a number of products displayed
        // and avoid issues with concrete products displaying
        searchPage = new SearchPage({ q: 'Cameras', search: 'brand=Kodak' });
        searchPage.visit();
      });

      it.skip('should apply price filtering', () => {
        cy.log('set minimum price');
        searchPage.getFacets().setMinPrice(minPrice);
        searchPage.waitForSearchRequest();
        checkProductCardsFilteringByPrice(searchPage, minPrice);

        cy.log('reset prices, set max price');
        searchPage.getFacets().resetPrices();
        searchPage.waitForTemplateRebuild();
        searchPage.getFacets().setMaxPrice(maxPrice);
        searchPage.waitForSearchRequest();
        checkProductCardsFilteringByPrice(searchPage, 0, maxPrice);

        cy.log('reset prices, change min price range');
        searchPage.getFacets().resetPrices();
        searchPage.waitForTemplateRebuild();
        searchPage.getFacets().setMinPriceRange(minPrice);
        searchPage.waitForTemplateRebuild();
        checkProductCardsFilteringByPrice(searchPage, minPrice);

        cy.log('reset prices, change max price range');
        searchPage.getFacets().resetPrices();
        searchPage.waitForTemplateRebuild();
        searchPage.getFacets().setMaxPriceRange(maxPrice);
        searchPage.waitForTemplateRebuild();
        checkProductCardsFilteringByPrice(searchPage, 0, maxPrice);
      });
    });
  });

  describe('Products sorting', () => {
    beforeEach(() => {
      searchPage = new SearchPage({ q: 'Cable' });
      cy.visit(searchPage.url);
    });

    it('should apply default sorting when sorting is cleared', () => {
      // check default sorting
      checkProductCardsSortingBySku(searchPage, sortingTestData.default);

      // change sorting
      searchPage
        .getProductSorting()
        .applySorting(Object.keys(sortingTestData)[2]);
      searchPage.waitForSearchRequest();

      // clear sorting and check that it is default again
      searchPage.getProductSorting().clearSorting();
      searchPage.waitForTemplateRebuild();
      checkProductCardsSortingBySku(searchPage, sortingTestData.default);
    });

    it('should apply all sorting options', () => {
      Object.keys(sortingTestData)
        .filter((option) => option !== 'default')
        .forEach((option) => {
          cy.log(`Sorting: ${option} is applied`);
          searchPage.getProductSorting().applySorting(option);
          searchPage.waitForSearchRequest();

          checkProductCardsSortingBySku(searchPage, sortingTestData[option]);
        });
    });
  });
});
