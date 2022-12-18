const {Router} = require('express')
const TeleBot = require('telebot')
const uuid = require('../node_modules/uuid')

const router = Router()
const bot = new TeleBot({
  token: '5564695539:AAExLu1zrbRPJvIYx8cQGL4gwEJpY5H38Fo'
})


router.get('/get-userId', (req, res) => {
  const getUUID = uuid()

  bot.on(`/link ${getUUID}`, (msg) => {
    console.log(msg)
    return msg.reply.text('asdf')
  }, {})

  bot.start();
})

module.exports = router
