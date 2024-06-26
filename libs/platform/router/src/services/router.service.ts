import { RouteConfig } from '@oryx-frontend/router/lit';
import { Observable } from 'rxjs';

export interface RouterService {
  go(route: string, extras?: NavigationExtras): void;
  back(): void;
  previousRoute(): Observable<string | null>;
  navigate(route: string): void;
  getEvents(type: RouterEventType): Observable<RouterEvent>;
  route(): Observable<string>;
  currentRoute(): Observable<string>;
  current(): Observable<RouteWithParams>;
  currentParams(): Observable<RouteParams>;
  currentQuery(): Observable<RouteParams | undefined>;
  acceptParams(params: RouteParams): void;
  getUrl(route?: string, extras?: NavigationExtras): Observable<string>;
  getPathId(id: string): string | undefined;
  setRoutes(routes: RouteConfig[]): void;
  getRoutes(): Observable<RouteConfig[] | undefined>;
  redirectNotFound(): Observable<void>;
}

export const RouterService = 'oryx.RouterService';

declare global {
  interface InjectionTokensContractMap {
    [RouterService]: RouterService;
  }
}

export const enum RouterEventType {
  NavigationEnd,
}

export const enum RouteType {
  Page = 'page',
  /** deprecated since 1.4, use PRODUCTS instead */
  ProductList = 'search',
  /** deprecated since 1.4, use PRODUCT instead */
  Product = 'product',
  Category = 'category',
  Checkout = 'checkout',
  CheckoutLogin = 'checkoutLogin',
  Order = 'order',
  /** deprecated since 1.4, use CART instead */
  Cart = 'cart',
  Login = 'login',
  NotFound = 'not-found',
  AddressList = 'address-list',
  AddressBookCreate = 'address-book-create',
  AddressBookEdit = 'address-book-edit',
}

export interface RouterEvent {
  type: RouterEventType;
  route: string;
}

export interface NavigationExtras {
  queryParams?: RouteParams;
  queryParamsHandling?: QueryParamsHandling;
  ignoreQueryParams?: string[];
}

export interface RouteParams {
  [key: string]: string | string[] | undefined;
}

export type QueryParamsHandling = 'merge' | '';

export type RouteWithParams = RouteConfig & {
  params: RouteParams;
  query: RouteParams;
};
