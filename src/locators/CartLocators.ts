interface CartLocators {
  title: string
  cartBadge: string
  checkoutButton: string
  cartListProductName: string
  cartListProductDesc: string
  cartListProductPrice: string
  cartItem: (number: number) => string
}

class CartLocators implements Readonly<CartLocators> {
  title = '[data-test="title"]'
  cartBadge = '[data-test="shopping-cart-badge"]'
  checkoutButton = '[data-test="checkout"]'
  cartListProductName = '[data-test="inventory-item-name"]'
  cartListProductDesc = '[data-test="inventory-item-desc"]'
  cartListProductPrice = '[data-test="inventory-item-price"]'
  cartItem = (number: number): string =>
    `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`
}

export const CartLocator = new CartLocators()
