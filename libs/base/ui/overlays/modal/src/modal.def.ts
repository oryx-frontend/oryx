import { componentDef } from '@oryx-frontend/utilities';

export const modalComponent = componentDef({
  name: 'oryx-modal',
  impl: () =>
    globalThis.HTMLDialogElement
      ? import('./modal.component').then((m) => m.ModalComponent)
      : import('./no-dialog-support/modal.component').then(
          (m) => m.NDSModalComponent
        ),
});
