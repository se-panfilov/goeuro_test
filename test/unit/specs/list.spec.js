const sinon = require('sinon')
const dom = require('../../../js/index').dom
const list = require('../../../js/index').list
const config = require('../../../js/index').config

const expect = require("chai").expect

describe('list:', () => {

  it('can display data', () => {
    const data = [
      {name: 'aaa'},
      {name: 'bbb'},
      {name: 'ccc'}
    ]

    const expectedHtml =
      `<li class="${config.listItemClass}">${data[0].name}</li>` +
      `<li class="${config.listItemClass}">${data[1].name}</li>` +
      `<li class="${config.listItemClass}">${data[2].name}</li>`

    const setHtmlMock = sinon.mock(dom)
    setHtmlMock.expects('setHTML').withArgs(sinon.match.any, expectedHtml).once()

    const result = list.displayData(data)

    expect(result).to.equal(expectedHtml)
    setHtmlMock.verify()
    setHtmlMock.restore()
  })


  it('can clear data', () => {
    const data = null
    expect(() => list.displayData(data)).to.throw('displayData: No data')
  })

  it('can display data', () => {
    const clearHtmlMock = sinon.mock(dom)
    clearHtmlMock.expects('clearHTML').once()

    list.clearData()
    clearHtmlMock.verify()
    clearHtmlMock.restore()
  })

})
