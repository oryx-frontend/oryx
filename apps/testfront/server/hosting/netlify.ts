import { builder } from '@netlify/functions';
import { storefrontHandler } from '@oryx-frontend/application/lambda';

const handler = builder((event, context) =>
  storefrontHandler(event, {
    ...context,
    root: 'file:///var/task/apps/storefront/dist/functions/ssr/index.js',
    index: '../../client/index.html',
    entry: '../../server/render.js',
    component: '<oryx-app></oryx-app>',
  })
);

export { handler };
