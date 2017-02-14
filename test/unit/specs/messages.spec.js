// const fs = require('fs')
// const html = fs.readFileSync(__dirname + '/../../../index.html', 'utf8')
// const jsdom = require('jsdom-global')()
// document.write(html)
// // global.document = {}
// const config = require('../../../js/index').config
// // const dom = require('../../../js/index').dom
// // const sinon = require('sinon')
// // const getElsStub = sinon.stub(document.body, 'getElementById')
//
// const messages = require('../../../js/index').messages
// import {expect} from "chai";
//
// describe('messages:', () => {
//
//
//   afterEach(function () {
//     const elem = document.getElementById(config.notificationsBoxId)
//     elem.innerHTML = ''
//   });
//
//   it('can show messages', () => {
//     const message = 'my message'
//     const elem = document.getElementById(config.notificationsBoxId)
//     expect(elem.textContent).to.equal('')
//
//     messages.showMessage(message)
//
//     expect(elem.textContent).to.equal(message)
//   })
//
//   it('can show empty messages', () => {
//     const message = ''
//     const elem = document.getElementById(config.notificationsBoxId)
//     expect(elem.textContent).to.equal('')
//
//     messages.showMessage(message)
//
//     expect(elem.textContent).to.equal(message)
//   })
//
//   it('can show null messages', () => {
//     const message = ''
//     const elem = document.getElementById(config.notificationsBoxId)
//     expect(elem.textContent).to.equal('')
//
//     messages.showMessage()
//
//     expect(elem.textContent).to.equal(message)
//   })
//
//   it('can clear messages', () => {
//     const message = 'my message'
//     const elem = document.getElementById(config.notificationsBoxId)
//     expect(elem.textContent).to.equal('')
//
//     messages.showMessage(message)
//
//     expect(elem.textContent).to.equal(message)
//
//     messages.clearMessage()
//
//     expect(elem.textContent).to.equal('')
//   })
//
// })
