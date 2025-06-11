type CheckoutCompletePageLocators = {
  title: string
  completeOrderTitle: string
  completeOrderDescription: string
  backHomeButton: string
}

export const CHECKOUT_COMPLETE_PAGE_LOCATORS: CheckoutCompletePageLocators = {
  title: '[data-test="title"]',
  completeOrderTitle: '[data-test="complete-header"]',
  completeOrderDescription: '[data-test="complete-text"]',
  backHomeButton: '[data-test="back-to-products"]',
} as const
