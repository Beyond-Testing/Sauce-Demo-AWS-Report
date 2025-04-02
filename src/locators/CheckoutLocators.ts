interface CheckoutCompleteLocator {
  title: string
  firstNameField: string
  lastNameField: string
  postalCodeField: string
  continueButton: string
}

class CheckoutLocators implements Readonly<CheckoutCompleteLocator> {
  title = '[data-test="title"]'
  firstNameField = '[data-test="firstName"]'
  lastNameField = '[data-test="lastName"]'
  postalCodeField = '[data-test="postalCode"]'
  continueButton = '[data-test="continue"]'
}

export const CheckoutLocator = new CheckoutLocators()
