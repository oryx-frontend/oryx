import { featureVersion } from '@oryx-frontend/utilities';
import * as services from '../services/src/index';

const reexports: typeof services =
  featureVersion < '1.2' ? services : (undefined as any);

/** @deprecated since 1.2, use DefaultCartService from @oryx-frontend/cart/services */
export const DefaultCartService = reexports?.DefaultCartService;
/** @deprecated since 1.2, use DefaultCartAdapter from @oryx-frontend/cart/services */
export const DefaultCartAdapter = reexports?.DefaultCartAdapter;
/** @deprecated since 1.2, use DefaultTotalsService from @oryx-frontend/cart/services */
export const DefaultTotalsService = reexports?.DefaultTotalsService;
/** @deprecated since 1.2, use cartAttributesNormalizer from @oryx-frontend/cart/services */
export const cartAttributesNormalizer = reexports?.cartAttributesNormalizer;
/** @deprecated since 1.2, use cartsItemsNormalizer from @oryx-frontend/cart/services */
export const cartsItemsNormalizer = reexports?.cartsItemsNormalizer;
/** @deprecated since 1.2, use CartResolver from @oryx-frontend/cart/services */
export const CartResolver = reexports?.CartResolver;
/** @deprecated since 1.2, use CartTotalsResolver from @oryx-frontend/cart/services */
export const CartTotalsResolver = reexports?.CartTotalsResolver;
