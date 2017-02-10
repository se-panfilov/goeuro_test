const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const messages = require('../../js/index').messages
import {expect} from "chai";

describe('messages:', () => {

  const NOTIFICATIONS_BOX_ID = 'notifications'

  it('can show messages', () => {
    const message = 'my message'
    const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
    expect(elem.textContent).to.equal('')

    messages.showMessage(message)

    expect(elem.textContent).to.equal(message)
  })

  it('can show empty messages', () => {
// TODO (S.Panfilov) pause before each test
    const message = ''
    const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
    expect(elem.textContent).to.equal('')

    messages.showMessage(message)

    expect(elem.textContent).to.equal(message)
  })

})
