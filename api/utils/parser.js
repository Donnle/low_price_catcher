const axios = require('axios')
const cheerio = require('cheerio')

class RozetkaParser {
  constructor(link) {
    this.link = link
  }

  async getProduct(link = this.link) {
    const rozetkaInfo = await axios.get(link).then((response) => response.data)
    return this.parseInfo(rozetkaInfo)
  }

  parseInfo(html) {
    const $ = cheerio.load(html)
    return {
      title: $('.product__title').text().trim(),
      price: normalizeNumber($('.product-prices__big').text().trim()),
      category: $('.breadcrumbs__item.breadcrumbs__item--last .breadcrumbs__link span').text().trim(),
      mainImage: $($('.main-slider__item .picture-container__picture').toArray()[0]).attr('src')
    }
  }
}

const normalizeNumber = (number) => {
  const availableChars = '1234567890'
  const arrayNumbers = number.toString().split('')
  let result = '';

  arrayNumbers.forEach((char) => {
    if (availableChars.includes(char)) result += char
  })

  return +result
}

module.exports = {
  RozetkaParser,
}
