import { QueryEvent } from '@spryker-oryx/core';
import { Cart, CartEntryQualifier } from '../../models';

export const CartModificationStart = 'CartModificationStart';
export type CartModificationStart = QueryEvent<unknown, CartEntryQualifier>;

export const CartModificationEnd = 'CartModificationEnd';
export type CartModificationEnd = QueryEvent<unknown, CartEntryQualifier>;

export const CartModificationSuccess = 'CartModificationSuccess';
export type CartModificationSuccess = QueryEvent<
  unknown | Cart,
  CartEntryQualifier
>;

export const CartModificationFail = 'CartModificationFail';
export type CartModificationFail = QueryEvent<unknown, CartEntryQualifier>;

export const CartEntryRemoved = 'CartEntryRemoved';
export type CartEntryRemoved = QueryEvent<unknown, CartEntryQualifier>;