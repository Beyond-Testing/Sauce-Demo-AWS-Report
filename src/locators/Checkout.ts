type CheckoutPageLocators = {
  title: string
  firstNameField: string
  lastNameField: string
  postalCodeField: string
  continueButton: string
}

export const CHECKOUT_PAGE_LOCATORS: CheckoutPageLocators = {
  title: '[data-test="title"]',
  firstNameField: '[data-test="firstName"]',
  lastNameField: '[data-test="lastName"]',
  postalCodeField: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
} as const
