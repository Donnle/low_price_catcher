const {Router} = require('express')
const utils = require('../utils/parser.js')

const router = Router()

router.post('/get-product', async (req, res) => {
  const {link} = req.body
  try {
    const rozetkaParser = await new utils.RozetkaParser(link).getProduct()
    return res.status(200).send({data: rozetkaParser, success: true})
  } catch (error) {
    const data = {message: 'Something went wrong. Please, check link'}
    return res.status(400).send({data, success: false})
  }
})

module.exports = router
