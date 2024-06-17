import { injectEnv } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { strapiFieldNormalizers } from './normalizers';
import { DefaultStrapiContentAdapter } from './strapi-content.adapter';
import {
  StrapiApiUrl,
  StrapiContentAdapter,
  StrapiToken,
} from './strapi.model';

export const strapiProviders: Provider[] =
  featureVersion >= '1.4' &&
  import.meta.env?.ORYX_STRAPI_TOKEN &&
  import.meta.env?.ORYX_STRAPI_API_URL
    ? [
        {
          provide: StrapiToken,
          useFactory: () => injectEnv('ORYX_STRAPI_TOKEN', ''),
        },
        {
          provide: StrapiApiUrl,
          useFactory: () => injectEnv('ORYX_STRAPI_API_URL', ''),
        },
        ...strapiFieldNormalizers,
        {
          provide: StrapiContentAdapter,
          useClass: DefaultStrapiContentAdapter,
        },
      ]
    : [];
