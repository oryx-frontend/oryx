import {
  DefaultJsonAPITransformerService,
  InheritTransformerResult,
} from '@oryx-frontend/core';
import { ssrAwaiter } from '@oryx-frontend/core/utilities';

export class ServerJsonApiTransformerService extends DefaultJsonAPITransformerService {
  transform<T extends keyof InjectionTokensContractMap>(
    data: unknown,
    token: T
  ): InheritTransformerResult<T>;
  transform<T>(
    data: unknown,
    token: keyof InjectionTokensContractMap
  ): InheritTransformerResult<T> {
    return ssrAwaiter<any>(super.transform(data, token));
  }
}
