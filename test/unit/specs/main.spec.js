const elements = require('../../../js/index').elements
const main= require('../../../js/index').main
const dom = require('../../../js/index').dom
const sinon = require('sinon')

describe('elements:', () => {

  describe('init.', () => {
    it('happy path', () => {
      const elementsMock = sinon.mock(elements)
      const formElemResult = {name: 'formElemResult'}
      const inputElemResult = {name: 'inputElemResult'}
      elementsMock.expects('getForm').returns(formElemResult).once()
      elementsMock.expects('getInput').returns(inputElemResult).once()

      const domMock = sinon.mock(dom)
      domMock.expects('addEventListener').withArgs(formElemResult, 'submit', sinon.match.any).once()

      main.init()

      elementsMock.verify()
      elementsMock.restore()
    })

  })


})
