const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const messages = require('../../js/index').messages
import {expect} from "chai";

describe('messages:', () => {

  const NOTIFICATIONS_BOX_ID = 'notifications'

  afterEach(function () {
    const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
    elem.innerHTML = ''
  });

  // it('can show messages', () => {
  //   const message = 'my message'
  //   const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
  //   expect(elem.textContent).to.equal('')
  //
  //   messages.showMessage(message)
  //
  //   expect(elem.textContent).to.equal(message)
  // })
  //
  // it('can show empty messages', () => {
  //   const message = ''
  //   const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
  //   expect(elem.textContent).to.equal('')
  //
  //   messages.showMessage(message)
  //
  //   expect(elem.textContent).to.equal(message)
  // })
  //
  // it('can show null messages', () => {
  //   const message = ''
  //   const elem = document.getElementById(NOTIFICATIONS_BOX_ID)
  //   expect(elem.textContent).to.equal('')
  //
  //   messages.showMessage()
  //
  //   expect(elem.textContent).to.equal(message)
  // })

})
