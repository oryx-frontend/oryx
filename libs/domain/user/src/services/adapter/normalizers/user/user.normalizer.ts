import { Transformer } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { User } from '../../../../models';
import { DeserializedUser } from '../model';

export const UserNormalizer = 'oryx.UserNormalizer*';

export function userDataNormalizer(data: DeserializedUser): User {
  return data;
}

export const userNormalizer: Provider[] = [
  {
    provide: UserNormalizer,
    useValue: userDataNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [UserNormalizer]: Transformer<User>;
  }
}
