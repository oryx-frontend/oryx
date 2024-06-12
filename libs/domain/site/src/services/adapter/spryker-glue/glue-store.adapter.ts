import { HttpService, JsonAPITransformerService } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import { Observable } from 'rxjs';
import { Store } from '../../../models';
import { StoreNormalizer } from './normalizers';
import { StoreAdapter } from './store.adapter';

export class GlueStoreAdapter implements StoreAdapter {
  constructor(
    protected httpService = inject(HttpService),
    protected SCOS_BASE_URL = inject('SCOS_BASE_URL'),
    protected transformer = inject(JsonAPITransformerService)
  ) {}

  get(): Observable<Store[]> {
    return this.httpService
      .get(`${this.SCOS_BASE_URL}/stores`)
      .pipe(this.transformer.do(StoreNormalizer));
  }
}
