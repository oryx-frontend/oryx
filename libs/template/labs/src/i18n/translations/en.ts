const product = {
  'product.availability.none': 'Not available',
  'product.availability.limited': 'Limited availability',
  'product.availability.limited-<stock>':
    'Limited availability ({stock, plural, one {one product} other {{stock} products}})',
  'product.availability.available': 'Available online',
  'product.availability.available-<stock>':
    'Available online ({stock, plural, one {one product} other {{stock} products}})',
  'product.discontinued': 'This product is no longer available.',
};

const carts = {
  'carts.totals.<count>-carts':
    'My carts ({count, plural, one {1 cart} other {{count} carts}})',
  'carts.totals.<count>-items':
    '({count, plural, 0 {empty} one {1 item} other {{count} items}})',
  'carts.list.no-cart-entries':
    'There are no cart entries for this cart available.',
  'carts.price-mode.gross': '(Gross)',
  'carts.price-mode.net': '(Net)',
  'carts.create.cart-<name>-created': 'Cart "{name}" was successfully created',
};

const cart = {
  'cart.totals.<count>-items':
    'My cart ({count, plural, one {one item} other {{count} items}})',
  'cart.totals.<count>-discounts':
    '{count, plural, one {Discount} other {Discounts}}',
  'cart.totals.unknown-delivery-cost':
    'Delivery costs will be calculated at checkout',
  'cart.entry.<quantity>-items': 'x {quantity}',
  'cart.entry.confirm-remove-<sku>': 'Do you want to remove "{sku}"?',
  'cart.confirm-removed': 'Item is successfully removed',
  'oauth.logging-you-in': 'Logging you in...',
  'cart.edit.name.placeholder': 'The name of the shopping cart',
  'cart.edit.set-default': 'Make this cart my current cart',
};

const coupon = {
  'coupon.insert': 'Please insert a coupon code',
  'coupon.invalid': 'Coupon code can not be added',
  'coupon.(valid-till-<date>)': '(valid till {date})',
};

const checkout = {
  'checkout.guest.continue-without-account':
    'You can checkout without creating an account. You will have a chance to create an account later.',
  'checkout.totals.<count>-items':
    'Products ({count, plural, one {one item} other {{count} items}})',
};

const order = {
  'order.<count>-items':
    'Products ({count, plural, one {{count} item} other {{count} items}})',
};

const user = {
  'user.address.remove-info':
    'Removing this address will not remove any pending orders being dispatched to this` address',
};

const ui = {
  'ui.password.at-least-<count>-characters':
    'At least {count, plural, one {{count} character} other {{count} characters}}',
  'ui.password.at-most-<count>-characters':
    'At most {count, plural, one {{count} character} other {{count} characters}}',
  'ui.password.at-least-<count>-uppercase-letters':
    'At least {count, plural, one {{count} uppercase letter} other {{count} uppercase letters}}',
  'ui.password.at-least-<count>-numbers':
    'At least {count, plural, one {{count} number} other {{count} numbers}}',
  'ui.password.at-least-<count>-special-chars':
    'At least {count, plural, one {{count} special character} other {{count} special characters}} (e.g. *$%)',
};

const search = {
  'search.facet.rating.up': '& up',
};

export default {
  ...product,
  ...cart,
  ...carts,
  ...coupon,
  ...checkout,
  ...order,
  ...user,
  ...ui,
  ...search,
};
