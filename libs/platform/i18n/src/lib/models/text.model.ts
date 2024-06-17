import { I18nContext } from '@oryx-frontend/utilities';

/**
 * @deprecated since 1.4. Use I18nContent interface
 * from '@oryx-frontend/utilities' instead.
 */
export interface TextResource {
  raw?: string;
  token?: string | readonly string[];
  values?: I18nContext;
}
