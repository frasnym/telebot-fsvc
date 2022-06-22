import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { EnvVars } from "../types/rest-api";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object({
  DUMMY: Joi.string().required(),
}).unknown();

const { value, error } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export default {
  dummy: envVars.DUMMY,
};
