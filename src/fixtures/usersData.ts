import {errorMessages} from './errorMessagesData'
import {faker} from '@faker-js/faker'

export const invalidUserLoginData = [
  {
    username: 'standard_user',
    password: 'incorrect_password',
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: 'incorrect_username',
    password: 'secret_sauce',
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: 'incorrect_username',
    password: 'incorrect_password',
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: '',
    password: 'secret_sauce',
    errorMessage: errorMessages.empty_username_error_message,
  },
  {
    username: 'standard_user',
    password: '',
    errorMessage: errorMessages.empty_password_error_message,
  },
  {
    username: '',
    password: '',
    errorMessage: errorMessages.empty_username_error_message,
  },
] as const

export const validUserLoginData = [
  {username: 'standard_user', password: 'secret_sauce'},
  {username: 'visual_user', password: 'secret_sauce'},
  {username: 'problem_user', password: 'secret_sauce'},
  {username: 'performance_glitch_user', password: 'secret_sauce'},
  {username: 'error_user', password: 'secret_sauce'},
  {username: 'locked_out_user', password: 'secret_sauce'},
] as const

export const randomUserDataForCheckout = {
  firstname: faker.person.firstName('male'),
  lastname: faker.person.lastName('male'),
  postalcode: Number(faker.location.zipCode()),
} as const
