type ProductPageLocators = {
  cartButton: string
  title: string
  openHamburgerMenu: {
    role: 'button'
    name: string
  }
  logoutButton: string
  addToCartItem: (item: string) => string
}

export const PRODUCT_PAGE_LOCATORS: ProductPageLocators = {
  cartButton: '[data-test="shopping-cart-link"]',
  title: '[data-test="title"]',
  openHamburgerMenu: {
    role: 'button',
    name: 'Open Menu',
  },
  logoutButton: '[data-test="logout-sidebar-link"]',
  addToCartItem: (item: string): string => `[data-test="add-to-cart-${item}"]`,
} as const
