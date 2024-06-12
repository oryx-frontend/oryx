import { resolve } from '@oryx-frontend/di';
import { AppFeature, ExecPlugin } from './orchestration';
import { AppInitializerService, coreProviders } from './services';

export const coreFeature: AppFeature = {
  providers: coreProviders,
  plugins: [new ExecPlugin(() => resolve(AppInitializerService).initialize())],
};
