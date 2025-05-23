import {getEnvVariable} from '@/core/utils'

export const BASE_PAGE_URL: string = getEnvVariable('BASE_URL')

export const URL = {
  productsPage: `${BASE_PAGE_URL}/inventory.html`,
  checkoutPage: `${BASE_PAGE_URL}/cart.html`,
  checkoutStepOnePage: `${BASE_PAGE_URL}/checkout-step-one.html`,
  checkoutOverviewPage: `${BASE_PAGE_URL}/checkout-step-two.html`,
  checkoutCompletePage: `${BASE_PAGE_URL}/checkout-complete.html`,
} as const
