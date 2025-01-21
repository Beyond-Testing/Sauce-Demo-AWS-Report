type MenuButton = {
  role: 'button'
  name: string
}

export class ProductLocators {
  static readonly cartButtonSelector: string =
    '[data-test="shopping-cart-link"]'
  static readonly titleSelector: string = '[data-test="title"]'
  static readonly openHamburgerMenu: MenuButton = {
    role: 'button',
    name: 'Open Menu',
  }
  static readonly logoutButtonSelector: string =
    '[data-test="logout-sidebar-link"]'
  static readonly addToCartItemSelector = (item: string): string =>
    `[data-test="add-to-cart-${item}"]`
}
