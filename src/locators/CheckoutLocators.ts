type CheckoutLocators = {
  title: string
  firstNameField: string
  lastNameField: string
  postalCodeField: string
  continueButton: string
}

export const CHECKOUT_LOCATORS: CheckoutLocators = {
  title: '[data-test="title"]',
  firstNameField: '[data-test="firstName"]',
  lastNameField: '[data-test="lastName"]',
  postalCodeField: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
} as const
