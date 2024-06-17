import { componentDef } from '@oryx-frontend/utilities';

export const couponComponent = componentDef({
  name: 'oryx-cart-coupon',
  impl: () => import('./coupon.component').then((m) => m.CouponComponent),
  schema: () => import('./coupon.schema').then((m) => m.couponComponentSchema),
});
