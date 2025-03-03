import dotenv from 'dotenv'

dotenv.config()

type URLType = Record<string, string>

export const BASE_PAGE_URL: string = process.env.BASE_URL as string

export const URL: Readonly<URLType> = {
  productsPage: `${BASE_PAGE_URL}/inventory.html`,
  checkoutPage: `${BASE_PAGE_URL}/cart.html`,
  checkoutStepOnePage: `${BASE_PAGE_URL}/checkout-step-one.html`,
  checkoutOverviewPage: `${BASE_PAGE_URL}/checkout-step-two.html`,
  checkoutCompletePage: `${BASE_PAGE_URL}/checkout-complete.html`,
}
