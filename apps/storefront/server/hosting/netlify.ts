import { builder } from '@netlify/functions';
import { storefrontHandler } from '@oryx-frontend/application/lambda';

const handler = builder(storefrontHandler);

export { handler };
