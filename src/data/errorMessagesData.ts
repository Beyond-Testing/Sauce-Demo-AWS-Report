type ErrorMessage = Record<string, string>

export const errorMessages: Readonly<ErrorMessage> = {
  locked_out_error_message:
    'Epic sadface: Sorry, this user has been locked out.',
  no_match_credentials_error_message:
    'Epic sadface: Username and password do not match any user in this service',
  empty_password_error_message: 'Epic sadface: Password is required',
  empty_username_error_message: 'Epic sadface: Username is required',
}
