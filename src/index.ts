import app from './app'
import { envVars } from './config/env-vars'
import { logger } from './config/logger'
import furazooBot from './libs/bots/furazoo-bot'

app.listen({ port: envVars.port }, function (err) {
  if (err) {
    console.error(err)
    process.exit(0)
  }

  logger.info(`Application is up and running on port ${envVars.port}`)
})

function exitHandler () {
  if (app) {
    app.close(() => {
      logger.info('Server closed')
    })
  }

  if (furazooBot.getBotInstance()) {
    furazooBot.gracefulStopBot()
  }

  process.exit(1)
}

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (app) {
    app.close()
  }
})
