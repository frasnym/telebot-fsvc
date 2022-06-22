import { format, createLogger, transports } from "winston";
import { envVars } from "./env-vars";

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const timeZoned = () => {
  return new Date().toLocaleString("en-US", {
    // timeZone: envVars.timezone,
    timeZoneName: "short",
    hour12: false,
  });
};

const logger = createLogger({
  level: envVars.env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: timeZoned }),
    enumerateErrorFormat(),
    envVars.env === "development" ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] [${level}]: ${message}`
    )
  ),
  transports: [new transports.Console()],
  exitOnError: false,
});

export { logger };
