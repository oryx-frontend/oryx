import { componentDef } from '@oryx-frontend/utilities';

export const collapsibleTextComponent = componentDef({
  name: 'oryx-collapsible-text',
  impl: () =>
    import('./collapsible-text.component').then(
      (m) => m.CollapsibleTextComponent
    ),
});
