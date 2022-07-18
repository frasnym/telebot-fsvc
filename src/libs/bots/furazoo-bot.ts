import { Telegraf, Markup, Scenes, session } from 'telegraf'
import { envVars } from '../../config/env-vars'
import { logger } from '../../config/logger'
import { convertWhatsapp } from '../../controllers/furazoo-ctrl'
import { MyContext } from '../../types/furazoo-bot'

const bot = new Telegraf<MyContext>(envVars.teleBot.furazoo.token)
const botSecretPath = `/${bot.secretPathComponent()}`

const stage = new Scenes.Stage<MyContext>([convertWhatsapp.sceneInstance], {
  ttl: 10
})
bot.use(session())
bot.use(stage.middleware())

bot.command('help', (ctx) =>
  ctx.reply(
    'What can I help you with?',
    Markup.inlineKeyboard([
      Markup.button.callback(
        'Convert Phone to Whatsapp',
        convertWhatsapp.ACTION_ID
      )
    ])
  )
)
bot.action(convertWhatsapp.ACTION_ID, (ctx) =>
  ctx.scene.enter(convertWhatsapp.SCENE_ID)
)

bot.telegram.setWebhook(`${envVars.basePath}${botSecretPath}`)
logger.info(`[FurazooBot-${botSecretPath}] Successfully initialized`)

function gracefulStopBot () {
  bot.stop()
}

function getBotSecretPath () {
  return botSecretPath
}

function getBotInstance () {
  return bot
}

export default {
  getBotInstance,
  gracefulStopBot,
  getBotSecretPath
}
