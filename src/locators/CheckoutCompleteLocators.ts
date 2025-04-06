type CheckoutCompleteLocators = {
  title: string
  completeOrderTitle: string
  completeOrderDescription: string
  backHomeButton: string
}

export const CHECKOUT_COMPLETE_LOCATORS: CheckoutCompleteLocators = {
  title: '[data-test="title"]',
  completeOrderTitle: '[data-test="complete-header"]',
  completeOrderDescription: '[data-test="complete-text"]',
  backHomeButton: '[data-test="back-to-products"]',
} as const
