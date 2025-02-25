type UrlType = Record<string, string>

export const basePageURL: string = 'https://www.saucedemo.com'

export const url: Readonly<UrlType> = {
  productsPage: `${basePageURL}/inventory.html`,
  checkoutPage: `${basePageURL}/cart.html`,
  checkoutStepOnePage: `${basePageURL}/checkout-step-one.html`,
  checkoutOverviewPage: `${basePageURL}/checkout-step-two.html`,
  checkoutCompletePage: `${basePageURL}/checkout-complete.html`,
}
