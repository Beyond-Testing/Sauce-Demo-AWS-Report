import {getEnvVariable} from '@/helpers/envUtils'

export const BASE_URL: string = getEnvVariable('BASE_URL')

export const URL = {
  productsPage: `${BASE_URL}/inventory.html`,
  checkoutPage: `${BASE_URL}/cart.html`,
  checkoutStepOnePage: `${BASE_URL}/checkout-step-one.html`,
  checkoutOverviewPage: `${BASE_URL}/checkout-step-two.html`,
  checkoutCompletePage: `${BASE_URL}/checkout-complete.html`,
} as const
