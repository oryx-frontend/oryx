import { QueryEvent } from '@oryx-frontend/core';

export const PriceModeChanged = 'oryx.PriceModeChanged';

export type PriceModeChanged = QueryEvent<string>;
