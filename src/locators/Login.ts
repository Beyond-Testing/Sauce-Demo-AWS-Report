type LoginPageLocators = {
  usernameField: string
  passwordField: string
  loginButton: string
  errorMessage: string
}

export const LOGIN_PAGE_LOCATORS: LoginPageLocators = {
  usernameField: '[data-test="username"]',
  passwordField: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: "[data-test='error']",
} as const
