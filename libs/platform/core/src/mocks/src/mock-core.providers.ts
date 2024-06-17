import { Provider } from '@oryx-frontend/di';

export const mockCoreProviders: Provider[] = [
  {
    provide: 'SCOS_BASE_URL',
    useValue: '',
  },
];
