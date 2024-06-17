import {
  AppFeature,
  ContextFallback,
  EntityContext,
} from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import {
  DefaultLinkService,
  DefaultRouterService,
  LinkService,
  RouterService,
  routeEntityContextFallbackFactory,
  routerHydration,
} from './services';

export class RouterFeature implements AppFeature {
  providers: Provider[] = this.getProviders();

  protected getProviders(): Provider[] {
    return [
      { provide: RouterService, useClass: DefaultRouterService },
      ...(featureVersion >= '1.4'
        ? [{ provide: LinkService, useClass: DefaultLinkService }]
        : []),
      routerHydration,
      {
        provide: `${ContextFallback}${EntityContext}`,
        useFactory: routeEntityContextFallbackFactory,
      },
    ];
  }
}
