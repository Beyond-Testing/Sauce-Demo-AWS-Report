interface ICheckoutOverViewLocators {
  title: string
  totalPriceAfterTax: string
  finishButton: string
}

class CheckoutOverViewLocators implements Readonly<ICheckoutOverViewLocators> {
  title = '[data-test="title"]'
  totalPriceAfterTax = '[data-test="total-label"]'
  finishButton = '[data-test="finish"]'
}

export const CheckoutOverViewLocator = new CheckoutOverViewLocators()
