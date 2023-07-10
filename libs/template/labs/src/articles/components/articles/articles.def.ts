import { componentDef } from '@spryker-oryx/core';

export const articlesComponent = componentDef({
  name: 'oryx-content-articles',
  impl: () => import('./articles.component').then((m) => m.ArticlesComponent),
  schema: () => import('./articles.schema').then((m) => m.articlesSchema),
});