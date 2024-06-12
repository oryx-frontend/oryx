import { featureVersion } from '@oryx-frontend/utilities';
import * as services from '../services/src/index';

const reexports: typeof services =
  featureVersion < '1.2' ? services : (undefined as any);

/** @deprecated since 1.2, use DefaultCheckoutService from @oryx-frontend/checkout/services */
export const DefaultCheckoutService = reexports?.DefaultCheckoutService;
/** @deprecated since 1.2, use DefaultCheckoutAdapter from @oryx-frontend/checkout/services */
export const DefaultCheckoutAdapter = reexports?.DefaultCheckoutAdapter;
/** @deprecated since 1.2, use DefaultCheckoutDataService from @oryx-frontend/checkout/services */
export const DefaultCheckoutDataService = reexports?.DefaultCheckoutDataService;
/** @deprecated since 1.2, use DefaultCheckoutStateService from @oryx-frontend/checkout/services */
export const DefaultCheckoutStateService =
  reexports?.DefaultCheckoutStateService;
/** @deprecated since 1.2, use checkoutAttributesNormalizer from @oryx-frontend/checkout/services */
export const checkoutAttributesNormalizer =
  reexports?.checkoutAttributesNormalizer;
/** @deprecated since 1.2, use checkoutShipmentsNormalizer from @oryx-frontend/checkout/services */
export const checkoutShipmentsNormalizer =
  reexports?.checkoutShipmentsNormalizer;
/** @deprecated since 1.2, use checkoutPaymentsNormalizer from @oryx-frontend/checkout/services */
export const checkoutPaymentsNormalizer = reexports?.checkoutPaymentsNormalizer;
/** @deprecated since 1.2, use  from @oryx-frontend/checkout/services */
export const checkoutCartsNormalizer = reexports?.checkoutCartsNormalizer;
/** @deprecated since 1.2, use checkoutResponseAttributesNormalizer from @oryx-frontend/checkout/services */
export const checkoutResponseAttributesNormalizer =
  reexports?.checkoutResponseAttributesNormalizer;
/** @deprecated since 1.2, use paymentsNormalizer from @oryx-frontend/checkout/services */
export const paymentsNormalizer = reexports?.paymentsNormalizer;
/** @deprecated since 1.2, use shipmentsNormalizer from @oryx-frontend/checkout/services */
export const shipmentsNormalizer = reexports?.shipmentsNormalizer;
/** @deprecated since 1.2, use checkoutAttributesSerializer from @oryx-frontend/checkout/services */
export const checkoutAttributesSerializer =
  reexports?.checkoutAttributesSerializer;
/** @deprecated since 1.2, use checkoutDataAttributesSerializer from @oryx-frontend/checkout/services */
export const checkoutDataAttributesSerializer =
  reexports?.checkoutDataAttributesSerializer;
