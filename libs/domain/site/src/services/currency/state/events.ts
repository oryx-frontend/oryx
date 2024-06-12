import { QueryEvent } from '@oryx-frontend/core';

export const CurrencyChanged = 'oryx.CurrencyChanged';

export type CurrencyChanged = QueryEvent<string>;
