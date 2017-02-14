const config = require('../../../js/index').config
const messages = require('../../../js/index').messages
const dom = require('../../../js/index').dom
const sinon = require('sinon')

describe('messages:', () => {

  it('can show messages', () => {
    const expectedResult = '<div></div>'
    const typeClass = 'typeClass'
    const elemClasses = `${config.messageElementClass} ${typeClass}`
    const message = 'someMessage'

    const mock = sinon.mock(dom)

    mock.expects('createElem')
      .withExactArgs('div', elemClasses, message)
      .returns(expectedResult).once()

    mock.expects('setHTML')
      .withArgs(sinon.match.any, expectedResult)
      .once()

    messages.showMessage(message, typeClass)

    mock.verify()
    mock.restore()
  })

  it('can clear messages', () => {
    const mock = sinon.mock(dom)

    mock.expects('setHTML').once()

    messages.clearMessage()

    mock.verify()
    mock.restore()
  })

  it('can blink messages', () => {
    const message = 'message'
    const typeClass = 'typeClass'

    const mock = sinon.mock(messages)

    mock.expects('showMessage').withExactArgs(message, typeClass).once()
    // mock.expects('clearMessage').once()

    messages.blinkMessage(message, typeClass)

    mock.verify()
    mock.restore()
  })
})
