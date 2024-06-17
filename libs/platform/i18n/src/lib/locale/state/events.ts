import { QueryEvent } from '@oryx-frontend/core';

export const LocaleChanged = 'oryx.LocaleChanged';

export type LocaleChanged = QueryEvent<string>;
