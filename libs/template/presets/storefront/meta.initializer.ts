import { AppInitializer, PageMetaService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { bodyStyles, fontMeta, iconMeta } from '../src/meta';

export class StorefrontMetaInitializer implements AppInitializer {
  constructor(protected metaService = inject(PageMetaService, null)) {}

  initialize(): void {
    this.metaService?.add([...fontMeta(), ...bodyStyles(), ...iconMeta()]);
  }
}
