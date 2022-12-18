const express = require('express')
const parserRouter = require('./routes/parserRouter.js')
const telegramRouter = require('./routes/telegramRouter.js')

const app = express()
const PORT = 1234

app.use(express.json())
app.use('/api/parser', parserRouter)
app.use('/api/telegram', telegramRouter)

app.listen(PORT, () => {
  console.log(`Success started on port: ${PORT}`)
})
