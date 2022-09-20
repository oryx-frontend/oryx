export interface CheckoutData {
  addresses?: unknown[];
  paymentProviders?: unknown[];
  selectedShipmentMethods?: unknown[];
  shipments?: Shipment[];
  shipmentMethods?: Record<string, ShipmentMethod[]>;
}

export interface ShipmentMethod {
  deliveryTime?: number | null;
  carrierName: string;
  currencyIsoCode: string;
  name: string;
  price: number;
  id: number;
}

export interface Address {
  id?: string | null;
  address1: string | null;
  address2: string | null;
  address3?: string | null;
  city: string | null;
  company?: string | null;
  country: string | null;
  firstName: string | null;
  lastName: string | null;
  idCompanyBusinessUnitAddress?: string | null;
  iso2Code: string | null;
  phone?: string | null;
  salutation: string | null;
  zipCode: string | null;
}

export interface Shipment {
  items: string[];
  requestedDeliveryDate: string | null;
  selectedShipmentMethod?: ShipmentMethod;
  idShipmentMethod?: number;
  shippingAddress: Address;
  shipmentMethods?: Record<string, ShipmentMethod[]>;
  id?: string;
}