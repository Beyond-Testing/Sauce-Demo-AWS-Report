import {textAssertions} from '../utils/textAssertions'

export const loginData = [
  {
    username: 'standard_user',
    password: 'incorrect_password',
    errorMessage: textAssertions.NO_MATCH_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    username: 'incorrect_username',
    password: 'secret_sauce',
    errorMessage: textAssertions.NO_MATCH_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    username: 'incorrect_username',
    password: 'incorrect_password',
    errorMessage: textAssertions.NO_MATCH_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    username: '',
    password: 'secret_sauce',
    errorMessage: textAssertions.EMPTY_USERNAME_ERROR_MESSAGE,
  },
  {
    username: 'standard_user',
    password: '',
    errorMessage: textAssertions.EMPTY_PASSWORD_ERROR_MESSAGE,
  },
  {
    username: '',
    password: '',
    errorMessage: textAssertions.EMPTY_USERNAME_ERROR_MESSAGE,
  },
]

export const userCredentials = [
  {username: 'standard_user', password: 'secret_sauce'},
  {username: 'visual_user', password: 'secret_sauce'},
  {username: 'problem_user', password: 'secret_sauce'},
  {username: 'performance_glitch_user', password: 'secret_sauce'},
  {username: 'error_user', password: 'secret_sauce'},
]
