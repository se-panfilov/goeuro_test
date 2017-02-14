const elements = {
  typesSelect: 'select[name=types]',
  typesClearBtn: 'button[@click=onReset]',
  brandsSelect: 'select[name=brands]',
  brandClearBtn: 'button[@click=onReset]',
  colorsSelect: 'select[name=colors]',
  colorsClearBtn: 'button[@click=onReset]',
}

function selectOption (browser, select, val) {
  browser.click(`${select} option[value="${val}"]`)
}

function initPage (browser) {
  const devServer = browser.globals.devServerURL

  browser
    .url(devServer)
    .pause(200)

  return browser
}

module.exports = {
  '@tags': ['Main'],
  'default state': function (browser) {
    browser = initPage(browser)
    browser.expect.element('#app').to.be.present.before(1000)
    browser.expect.element(elements.typesSelect).to.be.a('select')
    browser.expect.element(elements.brandsSelect).to.be.a('select')
    browser.expect.element(elements.colorsSelect).to.be.a('select')

    browser.end()
  },
  'can select type': function (browser) {
    browser = initPage(browser)
    const val = 'car'

    //Wait for async data upload
    browser.expect.element(`${elements.typesSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.typesSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  },
  'can reset type': function (browser) {
    browser = initPage(browser)
    const val = 'car'

    browser.expect.element(`${elements.typesSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')
    selectOption(browser, elements.typesSelect, val)
    browser.expect.element('.details').text.to.equal(val)

    browser.click(`button[id="types-btn"]`)
    browser.expect.element('.details').text.to.equal('')

    browser.end()
  },
  'can filter by type': function (browser) {
    browser = initPage(browser)
    const val = 'car'

    const plane = 'Boeing 787 Dreamliner'
    const color = 'brown'

    browser.expect.element(`${elements.typesSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element(`${elements.brandsSelect} option[value="${plane}"]`).to.be.present
    browser.expect.element(`${elements.colorsSelect} option[value="${color}"]`).to.be.present

    selectOption(browser, elements.typesSelect, val)

    browser.expect.element(`${elements.brandsSelect} option[value="${plane}"]`).to.not.present
    browser.expect.element(`${elements.colorsSelect} option[value="${color}"]`).to.not.present

    browser.end()
  },
  'can select color': function (browser) {
    browser = initPage(browser)
    const val = 'black'

    browser.expect.element(`${elements.colorsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.colorsSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  },
  'can reset color': function (browser) {
    browser = initPage(browser)
    const val = 'black'

    browser.expect.element(`${elements.colorsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.colorsSelect, val)

    browser.expect.element('.details').text.to.equal(val)

    browser.click(`button[id="colors-btn"]`)
    browser.expect.element('.details').text.to.equal('')

    browser.end()
  },
  'can filter by color': function (browser) {
    browser = initPage(browser)
    const val = 'brown'

    const plane = 'Boeing 787 Dreamliner'
    const type = 'car'

    browser.expect.element(`${elements.colorsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element(`${elements.brandsSelect} option[value="${plane}"]`).to.be.present
    browser.expect.element(`${elements.typesSelect} option[value="${type}"]`).to.be.present

    selectOption(browser, elements.colorsSelect, val)

    browser.expect.element(`${elements.brandsSelect} option[value="${plane}"]`).to.not.present
    browser.expect.element(`${elements.typesSelect} option[value="${type}"]`).to.not.present

    browser.end()
  },
  'can select brand': function (browser) {
    browser = initPage(browser)
    const val = 'Bugatti Veyron'

    browser.expect.element(`${elements.brandsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.brandsSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  },
  'can reset brand': function (browser) {
    browser = initPage(browser)
    const val = 'Bugatti Veyron'

    browser.expect.element(`${elements.brandsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.brandsSelect, val)

    browser.expect.element('.details').text.to.equal(val)

    browser.click(`button[id="brands-btn"]`)
    browser.expect.element('.details').text.to.equal('')

    browser.end()
  },
  'can filter by brand': function (browser) {
    browser = initPage(browser)
    const val = 'Boeing 787 Dreamliner'

    const color = 'brown'
    const type = 'car'

    browser.expect.element(`${elements.brandsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element(`${elements.colorsSelect} option[value="${color}"]`).to.be.present
    browser.expect.element(`${elements.typesSelect} option[value="${type}"]`).to.be.present

    selectOption(browser, elements.brandsSelect, val)

    browser.expect.element(`${elements.colorsSelect} option[value="${color}"]`).to.not.present
    browser.expect.element(`${elements.typesSelect} option[value="${type}"]`).to.not.present

    browser.end()
  },
  'can select brand and color and type at the same time': function (browser) {
    browser = initPage(browser)
    const brand = 'Bugatti Veyron'
    const color = 'black'
    const type = 'car'

    browser.expect.element(`${elements.brandsSelect} option[value="${brand}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.typesSelect, type)
    selectOption(browser, elements.brandsSelect, brand)
    selectOption(browser, elements.colorsSelect, color)

    browser.expect.element('.subtitle.details__item.-type').text.to.equal(type)
    browser.expect.element('.title.details__item.-brand').text.to.equal(brand)
    browser.expect.element('.subtitle.details__item.-color').text.to.equal(color)
    browser.end()
  }
}
