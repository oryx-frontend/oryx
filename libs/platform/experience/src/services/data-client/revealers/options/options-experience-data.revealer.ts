import { AppRef, FeatureOptionsService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { ComponentsPlugin } from '@oryx-frontend/utilities';
import { Observable, tap } from 'rxjs';
import { optionsKey } from '../../../../decorators';
import { MessageType } from '../../data-client.model';
import { ExperienceDataRevealer } from '../../data-client.service';
import { catchMessage, postMessage } from '../../utilities';

export class OptionsExperienceDataRevealer implements ExperienceDataRevealer {
  constructor(
    protected appRef = inject(AppRef),
    protected optionsService = inject(FeatureOptionsService)
  ) {}

  protected options$ = catchMessage(MessageType.ComponentType).pipe(
    tap((type) => {
      const componentPlugin = this.appRef.requirePlugin(ComponentsPlugin);

      postMessage({
        type: MessageType.Options,
        data: {
          ...componentPlugin.getComponentClass(type)?.[optionsKey],
          ...this.optionsService.getFeatureOptions(type),
        },
      });
    })
  );

  reveal(): Observable<unknown> {
    return this.options$;
  }
}
