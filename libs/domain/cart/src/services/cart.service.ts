import { QueryState } from '@oryx-frontend/core';
import { Observable } from 'rxjs';
import {
  AddCartEntryQualifier,
  Cart,
  CartEntry,
  CartEntryQualifier,
  CartQualifier,
  Coupon,
  CouponQualifier,
  CreateCartQualifier,
  UpdateCartEntryQualifier,
  UpdateCartQualifier,
} from '../models';

export interface CartService {
  getCart(data?: CartQualifier): Observable<Cart | undefined>;
  getCarts(): Observable<Cart[] | undefined>;
  getCartState(data?: CartQualifier): Observable<QueryState<Cart>>;
  getEntries(data?: CartQualifier): Observable<CartEntry[]>;
  getCoupons(data?: CartQualifier): Observable<Coupon[]>;
  addCoupon(data?: CouponQualifier): Observable<unknown>;
  deleteCoupon(data?: CouponQualifier): Observable<unknown>;
  addEntry(data: AddCartEntryQualifier): Observable<unknown>;
  updateEntry(data: UpdateCartEntryQualifier): Observable<unknown>;
  deleteEntry(data: CartEntryQualifier): Observable<unknown>;
  updateCart(data: UpdateCartQualifier): Observable<Cart>;
  createCart(data: CreateCartQualifier): Observable<Cart>;
  deleteCart(data: CartQualifier): Observable<unknown>;

  /**
   * Get busy state for either cart or individual entry by groupKey
   */
  isBusy(qualifier?: CartEntryQualifier): Observable<boolean>;
  isEmpty(data?: CartQualifier): Observable<boolean>;
}

export const CartService = 'oryx.CartService';

declare global {
  interface InjectionTokensContractMap {
    [CartService]: CartService;
  }
}
