import { inject } from '@oryx-frontend/di';
import { ExperienceDataService } from '@oryx-frontend/experience';
import { LitRoutesRegistry, RouteConfig } from '@oryx-frontend/router/lit';

export function experienceStaticRoutesFactory(
  experienceData = inject(ExperienceDataService)
): LitRoutesRegistry {
  const pages = experienceData
    .getData()
    .filter((c) => c.type === 'Page' && c.meta?.route && c.meta?.routeType);

  const routes: RouteConfig[] = [];

  for (const page of pages) {
    const { route, routeType } = page.meta as {
      route: string | string[];
      routeType: string;
    };

    if (Array.isArray(route)) {
      route.forEach((r) => routes.push({ path: r, type: routeType }));
    } else {
      routes.push({ path: route, type: routeType });
    }
  }
  return { routes };
}

export const experienceRoutesProvider = {
  provide: LitRoutesRegistry,
  useFactory: experienceStaticRoutesFactory,
};
