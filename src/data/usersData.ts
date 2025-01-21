import {errorMessages} from './errorMessagesData'
import {faker} from '@faker-js/faker'

interface IUser {
  username: string
  password: string
  errorMessage: string
}

interface IUserData {
  firstName: string
  lastName: string
  postalCode: number
}

export const invalidUserLoginData: Readonly<IUser[]> = [
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
]

export const validUserLoginData: Readonly<Array<Omit<IUser, 'errorMessage'>>> =
  [
    {username: 'standard_user', password: 'secret_sauce'},
    {username: 'visual_user', password: 'secret_sauce'},
    {username: 'problem_user', password: 'secret_sauce'},
    {username: 'performance_glitch_user', password: 'secret_sauce'},
    {username: 'error_user', password: 'secret_sauce'},
    {username: 'locked_out_user', password: 'secret_sauce'},
  ]

export const randomUserDataForCheckout: Readonly<IUserData> = {
  firstName: faker.person.firstName('male'),
  lastName: faker.person.lastName('male'),
  postalCode: Number(faker.location.zipCode()),
}
