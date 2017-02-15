const elements = {
  submitBtn: 'button[type=submit]',
  form: 'form[id=search_form]',
  usernameInput: 'input[id=username]',
  isCorsCheckbox: 'input[id=is_cors]',
  reposList: 'ul[id=repos_list]',
  notificationsBlock: 'div[id=notifications]',
  listItems: 'ul#repos_list li'
}

function initPage (browser) {
  const devServer = browser.globals.devServerURL

  browser
    .url(devServer)
    .pause(200)

  return browser
}

module.exports = {
  'default state': function (browser) {
    browser = initPage(browser)
    browser.expect.element(elements.form).to.be.present.before(1000)
    browser.expect.element(elements.notificationsBlock).to.be.present.before(1000)

    browser.expect.element(elements.form).to.be.a('form')
    browser.expect.element(elements.submitBtn).to.be.a('button')
    browser.expect.element(elements.usernameInput).to.be.a('input')
    browser.expect.element(elements.isCorsCheckbox).to.be.a('input')

    browser.expect.element(elements.reposList).to.be.a('ul')
    browser.assert.elementCount(elements.listItems, 0)

    browser.end()
  },
  'get repos': function (browser) {
    browser = initPage(browser)
    browser.expect.element(elements.form).to.be.present.before(1000)
    browser.assert.elementCount(elements.listItems, 0)

    browser.click(elements.submitBtn)
    browser.pause(1000)

    browser.assert.elementCountMoreThan(elements.listItems, 0)

    browser.end()
  },
  'unknown user': function (browser) {
    browser = initPage(browser)
    browser.expect.element(elements.form).to.be.present.before(1000)
    browser.assert.elementCount(elements.listItems, 0)

    browser.setValue(elements.usernameInput,'123213')
    browser.click(elements.submitBtn)
    browser.pause(1000)

    browser.assert.elementCount(elements.listItems, 0)

    browser.end()
  }

}
