import dotenv from 'dotenv'

dotenv.config()

export const getEnvCredentials = (credentials: string): string => {
  if (!process.env[credentials]) {
    throw new Error(`Environment variable ${credentials} is not set.`)
  }
  return process.env[credentials] as string
}
