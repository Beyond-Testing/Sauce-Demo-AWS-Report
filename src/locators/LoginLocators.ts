interface ILoginLocators {
  usernameField: string
  passwordField: string
  loginButton: string
  errorMessage: string
}

class LoginLocators implements Readonly<ILoginLocators> {
  usernameField = '[data-test="username"]'
  passwordField = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'
  errorMessage = "[data-test='error']"
}

export const LoginLocator = new LoginLocators()
