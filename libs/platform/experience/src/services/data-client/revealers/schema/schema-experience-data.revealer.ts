import { AppRef } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { ComponentsPlugin } from '@oryx-frontend/utilities';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ContentComponentSchema } from '../../../../models';
import { MessageType } from '../../data-client.model';
import { ExperienceDataRevealer } from '../../data-client.service';
import { postMessage } from '../../utilities';

export class SchemaExperienceDataRevealer implements ExperienceDataRevealer {
  constructor(protected appRef = inject(AppRef)) {}

  protected schemas$ = of(this.appRef.requirePlugin(ComponentsPlugin)).pipe(
    switchMap((componentPlugin) => componentPlugin.getComponentSchemas()),
    tap((schemas) => {
      postMessage({
        type: MessageType.ComponentSchemas,
        data: schemas as ContentComponentSchema[],
      });
    })
  );

  reveal(): Observable<unknown> {
    return this.schemas$;
  }
}
