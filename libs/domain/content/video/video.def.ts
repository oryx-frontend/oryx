import { componentDef } from '@oryx-frontend/utilities';
import { ContentVideoOptions } from './video.model';

declare global {
  interface FeatureOptions {
    'oryx-content-video'?: ContentVideoOptions;
  }
}

export const contentVideoComponent = componentDef({
  name: 'oryx-content-video',
  impl: () => import('./video.component').then((m) => m.ContentVideoComponent),
  schema: () => import('./video.schema').then((m) => m.videoComponentSchema),
});
