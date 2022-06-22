import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
import { EnvVars } from '../types/rest-api'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000)
}).unknown()

const { value, error } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Environment validation error: ${error.message}`)
}

const envVarsMap: EnvVars = value
const envVars = {
  env: envVarsMap.NODE_ENV,
  port: envVarsMap.PORT
}

export { envVars }
