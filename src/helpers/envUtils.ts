import dotenv from 'dotenv'

dotenv.config()

export const getEnvVariable = (variableName: string): string => {
  if (!process.env[variableName]) {
    throw new Error(`Environment variable ${variableName} is not set.`)
  }
  return process.env[variableName]
}
