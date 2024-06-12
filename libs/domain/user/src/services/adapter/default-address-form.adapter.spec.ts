import { HttpService } from '@oryx-frontend/core';
import { HttpTestService } from '@oryx-frontend/core/testing';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { AddressFormAdapter } from './address-form.adapter';
import { DefaultAddressFormAdapter } from './default-address-form.adapter';

describe('DefaultAddressFormAdapter', () => {
  let http: HttpTestService;
  let adapter: AddressFormAdapter;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: AddressFormAdapter,
          useClass: DefaultAddressFormAdapter,
        },
        {
          provide: HttpService,
          useClass: HttpTestService,
        },
      ],
    });

    http = testInjector.inject(HttpService) as HttpTestService;
    adapter = testInjector.inject(AddressFormAdapter);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('should be provided', () => {
    expect(adapter).toBeInstanceOf(DefaultAddressFormAdapter);
  });

  it('should retrieve form json for specific country', () => {
    adapter.get({ country: 'DE' });
    expect(http.url).toBe('http://localhost:3000/assets/addresses/DE.json');
  });
});
