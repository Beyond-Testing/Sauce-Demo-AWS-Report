import {getEnvVariable} from '@/core/utils'
import {errorMessages} from '@/data/errorMessagesData'
import {faker} from '@faker-js/faker'

const VALID_PASSWORD: string = getEnvVariable('VALID_USER_PASSWORD')

interface User {
  username: string
  password: string
  errorMessage: string
}

interface UserData {
  firstName: string
  lastName: string
  postalCode: number
}

export const INVALID_USER_LOGIN_DATA: Readonly<User[]> = [
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
  Array<Omit<User, 'errorMessage'>>
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

export const generateRandomUserData = (): UserData => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: Number(faker.location.zipCode()),
  }
}
