import {errorMessages} from './errorMessagesData'
import {faker} from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()

const VALID_PASSWORD: Readonly<string> = process.env
  .VALID_USER_PASSWORD as string

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

export const INVALID_USER_LOGIN_DATA: Readonly<IUser[]> = [
  {
    username: 'standard_user',
    password: 'incorrect_password',
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: 'incorrect_username',
    password: VALID_PASSWORD,
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: 'incorrect_username',
    password: 'incorrect_password',
    errorMessage: errorMessages.no_match_credentials_error_message,
  },
  {
    username: '',
    password: VALID_PASSWORD,
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

export const VALID_USER_LOGIN_DATA: Readonly<
  Array<Omit<IUser, 'errorMessage'>>
> = [
  {
    username: 'standard_user',
    password: VALID_PASSWORD,
  },
  {
    username: 'visual_user',
    password: VALID_PASSWORD,
  },
  {username: 'problem_user', password: VALID_PASSWORD},
  {
    username: 'performance_glitch_user',
    password: VALID_PASSWORD,
  },
  {username: 'error_user', password: VALID_PASSWORD},
  {username: 'locked_out_user', password: VALID_PASSWORD},
]

export const RANDOM_USER_DATA_FOR_CHECKOUT: Readonly<IUserData> = {
  firstName: faker.person.firstName('male'),
  lastName: faker.person.lastName('male'),
  postalCode: Number(faker.location.zipCode()),
}
