import { ErrorHandler } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import {
  DefaultLocaleService,
  LocaleAdapter,
  LocaleService,
} from '@oryx-frontend/i18n';
import {
  BreadcrumbService,
  CountryService,
  CurrencyService,
  DefaultCountryService,
  DefaultCurrencyService,
  DefaultGenderService,
  DefaultLinkService,
  DefaultNotificationService,
  DefaultPriceModeService,
  DefaultPricingService,
  DefaultSalutationService,
  GenderService,
  LinkService,
  NotificationService,
  PriceMode,
  PriceModeService,
  PriceModes,
  PricingService,
  SalutationService,
  SapiLocaleAdapter,
  SiteErrorHandler,
  StoreService,
} from '@oryx-frontend/site';
import { MockBreadcrumbService } from './mock-breadcrumb.service';
import { MockStoreService } from './mock-store.service';

export const mockSiteProviders: Provider[] = [
  {
    provide: 'SCOS_BASE_URL',
    useValue: '',
  },
  {
    provide: 'STORE',
    useValue: '',
  },
  {
    provide: SalutationService,
    useClass: DefaultSalutationService,
  },
  {
    provide: GenderService,
    useClass: DefaultGenderService,
  },
  {
    provide: StoreService,
    useClass: MockStoreService,
  },
  {
    provide: CountryService,
    useClass: DefaultCountryService,
  },
  {
    provide: CurrencyService,
    useClass: DefaultCurrencyService,
  },
  {
    provide: LocaleService,
    useClass: DefaultLocaleService,
  },
  {
    provide: LocaleAdapter,
    useClass: SapiLocaleAdapter,
  },
  {
    provide: PricingService,
    useClass: DefaultPricingService,
  },
  {
    provide: LinkService,
    useClass: DefaultLinkService,
  },
  {
    provide: NotificationService,
    useClass: DefaultNotificationService,
  },
  {
    provide: ErrorHandler,
    useClass: SiteErrorHandler,
  },
  {
    provide: BreadcrumbService,
    useClass: MockBreadcrumbService,
  },
  {
    provide: PriceMode,
    useValue: PriceModes.GrossMode,
  },
  {
    provide: PriceModeService,
    useClass: DefaultPriceModeService,
  },
];
