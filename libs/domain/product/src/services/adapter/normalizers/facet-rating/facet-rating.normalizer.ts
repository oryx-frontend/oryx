import { Transformer } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { map, Observable, take } from 'rxjs';
import { ApiProductListModel, Facet, FacetType } from '../../../../models';
export const FacetRatingNormalizer = 'oryx.FacetRatingNormalizer*';

export function facetRatingNormalizer(
  facet: ApiProductListModel.RangeFacet
): Observable<Facet> {
  return resolve(RouterService)
    .currentQuery()
    .pipe(
      take(1),
      map((params) => {
        const { config, localizedName } = facet;
        const activeMin = params?.['rating[min]'];

        const values = {
          min: 0,
          max: facet.max,
          selected: {
            max: facet.activeMax,
            min: activeMin ? Number(activeMin) : 0,
          },
        };

        return {
          type: FacetType.Range,
          name: localizedName,
          parameter: config.parameterName,
          values,
        };
      })
    );
}

declare global {
  interface InjectionTokensContractMap {
    [FacetRatingNormalizer]: Transformer<Facet>[];
  }
}
