type CheckoutOverviewPageLocators = {
  title: string
  totalPriceAfterTax: string
  finishButton: string
}

export const CHECKOUT_OVERVIEW_PAGE_LOCATORS: CheckoutOverviewPageLocators = {
  title: '[data-test="title"]',
  totalPriceAfterTax: '[data-test="total-label"]',
  finishButton: '[data-test="finish"]',
} as const
