import { componentDef } from '@oryx-frontend/utilities';

export const oauthHandlerComponent = componentDef({
  name: 'oryx-auth-oauth-handler',
  impl: () => import('./oauth-handler.component').then((m) => m.default),
});
