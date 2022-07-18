// @ts-nocheck - ignoring fastify type errors, since it's not a telegraf dependency

import fastify from 'fastify'
import { name, version } from '../package.json'
import furazooBot from './libs/bots/furazoo-bot'

const app = fastify()

// Initialize Bot
app.post(furazooBot.getBotSecretPath(), (req, rep) =>
  furazooBot.getBotInstance().handleUpdate(req.body, rep.raw)
)

app.get('/', function (_req, rep) {
  rep.send(`${name} version ${version}`)
})

export default app
