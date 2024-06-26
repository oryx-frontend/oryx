import { fixture } from '@open-wc/testing-helpers';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { LocaleService } from '@oryx-frontend/i18n';
import { siteProviders } from '@oryx-frontend/site';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { of } from 'rxjs';
import { SiteDayComponent } from './day.component';
import { siteDayComponent } from './day.def';

class MockLocaleService implements Partial<LocaleService> {
  get = vi.fn().mockReturnValue(of('en'));
  formatDay = vi.fn();
}

describe('SiteDayComponent', () => {
  let element: SiteDayComponent;
  let localeService: MockLocaleService;

  beforeAll(async () => {
    await useComponent([siteDayComponent]);
  });

  beforeEach(async () => {
    const injector = createInjector({
      providers: [
        ...siteProviders,
        {
          provide: LocaleService,
          useClass: MockLocaleService,
        },
      ],
    });

    localeService = injector.inject(
      LocaleService
    ) as unknown as MockLocaleService;
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  describe('when the component is initialised', () => {
    beforeEach(async () => {
      element = await fixture(html`<oryx-site-day></oryx-site-day>`);
    });

    it('should be an instance of SiteDayComponent', () => {
      expect(element).toBeInstanceOf(SiteDayComponent);
    });
  });

  describe('when the current locale is "en"', () => {
    beforeEach(async () => {
      localeService.get.mockReturnValue(of('en'));
    });

    describe('and the day is monday', () => {
      beforeEach(async () => {
        localeService.formatDay.mockReturnValue('formatted-date');
        element = await fixture(
          html`<oryx-site-day .day=${'monday'}></oryx-site-day>`
        );
      });

      it('should call the locale service to format the date', () => {
        expect(localeService.formatDay).toHaveBeenCalledWith('monday');
      });

      it('should render the formatted date', () => {
        expect(element.shadowRoot?.textContent?.trim()).toBe('formatted-date');
      });
    });
  });

  describe('when an i18n token is provided', () => {
    beforeEach(async () => {
      localeService.get.mockReturnValue(of('en'));
      localeService.formatDay.mockReturnValue('formatted-date');
    });

    describe('and there is a day available', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-site-day
            .day=${'monday'}
            i18nToken="my.custom-<day>-day"
          ></oryx-site-day>`
        );
      });

      it('should render the token', () => {
        expect(element.shadowRoot?.textContent?.trim()).toBe(
          'Custom formatted-date day'
        );
      });
    });

    describe('and there is no day available', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-site-day i18nToken="my.custom-<day>-day"></oryx-site-day>`
        );
      });

      it('should not render the token', () => {
        expect(element.shadowRoot?.textContent?.trim()).toBe('');
      });
    });
  });
});
