import {errorMessages} from '@/data/errorMessagesData'
import {getEnvCredentials} from '@/helpers/envUtils'
import {faker} from '@faker-js/faker'

const VALID_PASSWORD: string = getEnvCredentials('VALID_USER_PASSWORD')

type User = {
  username: string
  password: string
  errorMessage: string
}

type UserData = {
  firstName: string
  lastName: string
  postalCode: number
}

export const INVALID_USER_LOGIN_DATA: Array<User> = [
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
] as const

export const VALID_USER_LOGIN_DATA: Array<Omit<User, 'errorMessage'>> = [
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
] as const

export const generateRandomUserData = (): UserData => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: Number(faker.location.zipCode()),
  }
}
