import { Markup, Scenes } from 'telegraf'
import { MyContext } from '../../types/furazoo-bot'

// Convert Whatsapp scene
const SCENE_ID = 'CONVERT_WHATSAPP_SCENE_ID'
const ACTION_ID = 'CONVERT_WHATSAPP_ACTION'
const sceneInstance = new Scenes.BaseScene<MyContext>(SCENE_ID)

sceneInstance.enter((ctx) => {
  ctx.session.mySessionProp = {}
  ctx.reply('Please enter phone number to convert..')
})
sceneInstance.leave((ctx) => ctx.reply('Exiting function.. Bye..'))
sceneInstance.on('text', (ctx) => {
  const errReply = 'Unable to parse your number, please try again..'
  try {
    const onlyNumbers = ctx.message.text.replace(/\D/g, '')
    if (onlyNumbers.length <= 0) return ctx.reply(errReply)

    const phoneNumber62Prefix = onlyNumbers.replace(/^0+/, '62')

    ctx.reply(
      'Here is your result...',
      Markup.inlineKeyboard([
        Markup.button.url('Whatsapp 🌎', `wa.me/${phoneNumber62Prefix}`)
      ])
    )

    return
  } catch (error) {
    return ctx.reply(errReply)
  }
})

export { ACTION_ID, SCENE_ID, sceneInstance }
