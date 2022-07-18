import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
import { EnvVars } from '../types/rest-api'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  BASE_PATH: Joi.string().required(),
  PORT: Joi.number().default(3000),
  TELEGRAM_BOT_FURAZOO_TOKEN: Joi.string().required()
}).unknown()

const { value, error } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Environment validation error: ${error.message}`)
}

const envVarsMap: EnvVars = value
const envVars = {
  env: envVarsMap.NODE_ENV,
  basePath: envVarsMap.BASE_PATH,
  port: envVarsMap.PORT,
  teleBot: {
    furazoo: {
      token: envVarsMap.TELEGRAM_BOT_FURAZOO_TOKEN
    }
  }
}

export { envVars }
