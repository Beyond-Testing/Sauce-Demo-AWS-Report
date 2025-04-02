type MenuButtonType = {
  role: 'button'
  name: string
}

interface ProductLocators {
  cartButton: string
  title: string
  openHamburgerMenu: MenuButtonType
  logoutButton: string
  addToCartItem: (item: string) => string
}

class ProductLocators implements Readonly<ProductLocators> {
  cartButton = '[data-test="shopping-cart-link"]'
  title = '[data-test="title"]'
  openHamburgerMenu: MenuButtonType = {
    role: 'button',
    name: 'Open Menu',
  }
  logoutButton = '[data-test="logout-sidebar-link"]'
  addToCartItem = (item: string): string => `[data-test="add-to-cart-${item}"]`
}

export const ProductLocator = new ProductLocators()
