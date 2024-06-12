import {
  ResolvedResult,
  Resolver,
  ResourceResolverConfig,
  TokenResourceResolver,
} from '@oryx-frontend/core';
import { Observable, of } from 'rxjs';

export class BaseResolver<T extends Record<string, Resolver>>
  implements TokenResourceResolver
{
  protected resolvers: T = {} as T;

  resolve(
    resolverOptions: ResourceResolverConfig | string
  ): Observable<ResolvedResult> {
    const { resolver, ...options } =
      typeof resolverOptions === 'object'
        ? resolverOptions
        : { resolver: resolverOptions };

    if (!(resolver in this.resolvers)) {
      console.warn(`Resolver ${resolver} is not supported`);
      return of(resolver);
    }
    return this.resolvers[resolver as keyof T](options);
  }
}
