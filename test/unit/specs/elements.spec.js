const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const config = require('../../../js/index').config
const elements = require('../../../js/index').elements
const dom = require('../../../js/index').dom
const sinon = require('sinon')
const expect = require("chai").expect

describe('elements:', () => {

  function checkGetSomeElem (method, elemId) {
    const mock = sinon.mock(elements)
    mock.expects('_getElem').withExactArgs(config[elemId]).returns({}).once()

    const result = elements[method]()

    expect(result).to.be.deep.equal({})

    mock.verify()
    mock.restore()
  }

  it('can getNotificationsBox element', () => {
    checkGetSomeElem('getNotificationsBox', 'notificationsBoxId')
  })

  it('can getList element', () => {
    checkGetSomeElem('getList', 'listId')
  })

  it('can getCorsCheckbox element', () => {
    checkGetSomeElem('getCorsCheckbox', 'corsCheckboxId')
  })

  it('can getForm element', () => {
    checkGetSomeElem('getForm', 'formId')
  })

  it('can getInput element', () => {
    checkGetSomeElem('getInput', 'inputId')
  })

  describe('_getElem.', () => {
    it('can _getElem element', () => {
      const id = 'someId'
      const mock = sinon.mock(dom)
      const expectedResult = {}
      mock.expects('getElement').withExactArgs(id).returns(expectedResult).once()

      const result = elements._getElem(id)

      expect(result).to.be.deep.equal(expectedResult)

      mock.verify()
      mock.restore()
    })

    it('should throw error when no id', () => {
      expect(() => elements._getElem(null)).to.throw('ID must be specified')
    })

    it('should throw error when no such elem', () => {
      const id = 'someId'
      const mock = sinon.mock(dom)
      mock.expects('getElement').withExactArgs(id).returns(null).once()

      expect(() => elements._getElem(id)).to.throw('No such element: someId')

      mock.verify()
      mock.restore()
    })
  })


})
