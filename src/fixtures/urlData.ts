type Url = Record<string, string>

export const basePage: Readonly<string> = 'https://www.saucedemo.com'

export const url: Readonly<Url> = {
  productsPage: `${basePage}/inventory.html`,
  checkoutPage: `${basePage}/cart.html`,
  checkoutStepOnePage: `${basePage}/checkout-step-one.html`,
  checkoutOverviewPage: `${basePage}/checkout-step-two.html`,
  checkoutCompletePage: `${basePage}/checkout-complete.html`,
}
