interface ICheckoutCompleteLocator {
  title: string
  completeOrderTitle: string
  completeOrderDescription: string
  backHomeButton: string
}

class CheckoutCompleteLocators implements Readonly<ICheckoutCompleteLocator> {
  title = '[data-test="title"]'
  completeOrderTitle = '[data-test="complete-header"]'
  completeOrderDescription = '[data-test="complete-text"]'
  backHomeButton = '[data-test="back-to-products"]'
}

export const CheckoutCompleteLocator = new CheckoutCompleteLocators()
