import { componentDef } from '@oryx-frontend/utilities';

export const colorModeSelectorComponent = componentDef({
  name: 'oryx-color-mode-selector',
  impl: () =>
    import('./color-mode-selector.component').then(
      (m) => m.ColorModeSelectorComponent
    ),
});
