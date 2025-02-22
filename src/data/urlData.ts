type Url = Record<string, string>

export const basePageURL: Readonly<string> = 'https://www.saucedemo.com'

export const url: Readonly<Url> = {
  productsPage: `${basePageURL}/inventory.html`,
  checkoutPage: `${basePageURL}/cart.html`,
  checkoutStepOnePage: `${basePageURL}/checkout-step-one.html`,
  checkoutOverviewPage: `${basePageURL}/checkout-step-two.html`,
  checkoutCompletePage: `${basePageURL}/checkout-complete.html`,
}
