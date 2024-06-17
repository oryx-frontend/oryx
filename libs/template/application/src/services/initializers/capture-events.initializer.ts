import { AppInitializer, PageMetaService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { captureEventsForHydrationInsertion } from '@oryx-frontend/utilities';

export const CaptureEventsInitializer = `${AppInitializer}CaptureEvents`;

export class DefaultCaptureEventsInitializer implements AppInitializer {
  constructor(protected metaService = inject(PageMetaService, null)) {}

  initialize(): void {
    this.metaService?.add([
      {
        name: 'script',
        toBody: true,
        attrs: {
          text: captureEventsForHydrationInsertion,
        },
      },
    ]);
  }
}
