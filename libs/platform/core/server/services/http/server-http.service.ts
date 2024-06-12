import { DefaultHttpService, RequestOptions } from '@oryx-frontend/core';
import { ssrAwaiter } from '@oryx-frontend/core/utilities';
import { Observable } from 'rxjs';

export class ServerHttpService extends DefaultHttpService {
  request<T = unknown>(
    url: string,
    options?: RequestOptions<T>
  ): Observable<T> {
    return ssrAwaiter(super.request(url, options));
  }
}
