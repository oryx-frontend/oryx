import { ApiCartModel, CartId } from '@oryx-frontend/cart';
import { CamelCase } from '@oryx-frontend/core/utilities';

export type DeserializedCartIncludes = {
  [P in ApiCartModel.Includes as `${CamelCase<P>}`]?: P extends
    | ApiCartModel.Includes.Items
    | ApiCartModel.Includes.GuestCartItems
    ? ApiCartModel.Entry[]
    : never;
};

export type DeserializedCart = ApiCartModel.Attributes &
  Pick<
    DeserializedCartIncludes,
    CamelCase<
      ApiCartModel.Includes.Items | ApiCartModel.Includes.GuestCartItems
    >
  > &
  CartId;
