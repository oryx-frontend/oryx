import {
  App,
  AppRef,
  FeatureOptionsService,
  ResourcePlugin,
} from '@spryker-oryx/core';
import { createInjector, destroyInjector, getInjector } from '@spryker-oryx/di';
import { of } from 'rxjs';
import { DataTransmitterService } from './data-transmitter.service';
import {
  DataIds,
  DefaultDataTransmitterService,
  REQUEST_GRAPHICS_MESSAGE_TYPE,
  REQUEST_OPTIONS_MESSAGE_TYPE,
} from './default-data-transmitter.service';

class MockApp implements Partial<App> {
  findPlugin = vi.fn();
}

class MockFeatureOptionsService implements Partial<FeatureOptionsService> {
  getOptions = vi.fn().mockReturnValue(of(null));
}

const getService = <T>(token: string) =>
  getInjector().inject(token) as unknown as T;

describe('DataTransmitterService', () => {
  beforeEach(() => {
    createInjector({
      providers: [
        {
          provide: DataTransmitterService,
          useClass: DefaultDataTransmitterService,
        },
        {
          provide: AppRef,
          useClass: MockApp,
        },
        {
          provide: FeatureOptionsService,
          useClass: MockFeatureOptionsService,
        },
      ],
    });
  });

  afterEach(() => {
    destroyInjector();
  });

  describe('initialize', () => {
    it('should send `REQUEST_RESOURCES_MESSAGE_TYPE` post message', async () =>
      await new Promise<void>((done) => {
        const mockResources = {
          graphics: {
            a: {},
            b: {},
            c: {},
          },
        };
        const app = getService<MockApp>(AppRef);
        getService<MockApp>(AppRef).findPlugin.mockReturnValue({
          getResources: () => mockResources,
        });
        getInjector().inject(DataTransmitterService).initialize().subscribe();
        window?.addEventListener('message', (e: MessageEvent) => {
          if (
            e.data.type === REQUEST_GRAPHICS_MESSAGE_TYPE &&
            e.data[DataIds.Graphics].length
          ) {
            expect(e.data[DataIds.Graphics]).toEqual(
              Object.keys(mockResources.graphics)
            );
            done();
          }
        });
        expect(app.findPlugin).toHaveBeenCalledWith(ResourcePlugin);
      }));

    it('should send `REQUEST_OPTIONS_MESSAGE_TYPE` post message', async () =>
      await new Promise<void>((done) => {
        const mockOptions = {
          global: {
            a: 'a',
          },
          b: {
            b: 'b',
          },
        };
        const optionsService = getService<MockFeatureOptionsService>(
          FeatureOptionsService
        );
        optionsService.getOptions.mockReturnValue(of(mockOptions));
        getInjector().inject(DataTransmitterService).initialize().subscribe();
        window?.addEventListener('message', (e: MessageEvent) => {
          if (
            e.data.type === REQUEST_OPTIONS_MESSAGE_TYPE &&
            e.data[DataIds.Options]
          ) {
            expect(e.data[DataIds.Options]).toEqual(mockOptions);
            done();
          }
        });
      }));
  });
});
