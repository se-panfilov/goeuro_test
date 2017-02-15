const sinon = require('sinon')
const fetchMock = require('fetch-mock')
const expect = require("chai").expect

const elements = {
  submitBtn: 'button[type=submit]',
  form: 'form[id=search_form]',
  usernameInput: 'input[id=username]',
  isCorsCheckbox: 'input[id=is_cors]',
  reposList: 'ul[id=repos_list]',
  notificationsBlock: 'div[id=notifications]'
}

function initPage (browser) {
  const devServer = browser.globals.devServerURL

  browser
    .url(devServer)
    .pause(200)

  return browser
}

module.exports = {
  // 'default state': function (browser) {
  //   browser = initPage(browser)
  //   browser.expect.element(elements.form).to.be.present.before(1000)
  //   browser.expect.element(elements.notificationsBlock).to.be.present.before(1000)
  //
  //   browser.expect.element(elements.form).to.be.a('form')
  //   browser.expect.element(elements.submitBtn).to.be.a('button')
  //   browser.expect.element(elements.usernameInput).to.be.a('input')
  //   browser.expect.element(elements.isCorsCheckbox).to.be.a('input')
  //
  //   browser.expect.element(elements.reposList).to.be.a('ul')
  //   // TODO (S.Panfilov) add elem's childs count === 0
  //
  //   browser.end()
  // },
  'get repos': function (browser) {
    browser = initPage(browser)
    browser.expect.element(elements.form).to.be.present.before(1000)

    browser.expect.element(elements.reposList).to.be.a('ul')

    // let server
    const url = 'https://api.github.com/users/se-panfilov/repos'
    const responseData = [
      {name: 'adsdsd'}
    ]

    // browser.execute(() => {
    //   server = sinon.fakeServer.create()
    //   server.respondWith('GET', url, [
    //     200, {'Content-Type': 'application/json'},
    //     JSON.stringify(responseData),
    //   ])
    // })


    browser.execute(() => {

      var couchdb = nock('https://api.github.com')
        .get('/users/se-panfilov/repos')
        .reply(200,responseData)
      })

    browser.click(elements.submitBtn)

    // const _fetchMock = fetchMock.get(url, responseData)


    // browser.execute(() => {
    //   server.respond()
    // })

    browser.pause(1000)

    browser.assert.elementCount("ul#repos_list li", 12323)

    // expect(_fetchMock.called(url)).to.be.true
    // _fetchMock.restore()

    // browser.execute(() => {
    //   server.restore()
    //   server = null
    // })
    browser.end()
  }

}
