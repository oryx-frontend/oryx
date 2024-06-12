import { PageMetaResolver } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { isServer } from 'lit';
import {
  DefaultThemeMetaInitializer,
  ThemeMetaInitializer,
} from './initializers';
import {
  CaptureEventsInitializer,
  DefaultCaptureEventsInitializer,
} from './initializers/capture-events.initializer';
import { GlobalPageMetaResolver } from './resolvers';

export const applicationProviders: Provider[] = [
  {
    provide: PageMetaResolver,
    useClass: GlobalPageMetaResolver,
  },
  {
    provide: ThemeMetaInitializer,
    useClass: DefaultThemeMetaInitializer,
  },
  ...(isServer
    ? [
        {
          provide: CaptureEventsInitializer,
          useClass: DefaultCaptureEventsInitializer,
        },
      ]
    : []),
];
