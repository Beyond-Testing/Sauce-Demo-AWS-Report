type CheckoutOverviewLocators = {
  title: string
  totalPriceAfterTax: string
  finishButton: string
}

export const CHECKOUT_OVERVIEW_LOCATORS: CheckoutOverviewLocators = {
  title: '[data-test="title"]',
  totalPriceAfterTax: '[data-test="total-label"]',
  finishButton: '[data-test="finish"]',
} as const
