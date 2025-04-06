type LoginLocators = {
  usernameField: string
  passwordField: string
  loginButton: string
  errorMessage: string
}

export const LOGIN_LOCATORS: LoginLocators = {
  usernameField: '[data-test="username"]',
  passwordField: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: "[data-test='error']",
} as const
