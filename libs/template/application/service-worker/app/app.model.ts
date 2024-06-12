import { AppBuilder, AppFeature } from '@oryx-frontend/core';
import { InjectorOptions, Provider } from '@oryx-frontend/di';

export interface ModularAppBuilderOptions {
  injector?: Omit<InjectorOptions, 'providers'>;
}

export interface AppBuilderWithModules
  extends AppBuilder<AppBuilderWithModules> {
  withProviders(providers: Provider[]): AppBuilderWithModules;
  withFeature(feature: AppFeature | AppFeature[]): AppBuilderWithModules;
  withAppOptions(options: ModularAppBuilderOptions): AppBuilderWithModules;
  withEnvironment(env: AppEnvironment): AppBuilderWithModules;
}
