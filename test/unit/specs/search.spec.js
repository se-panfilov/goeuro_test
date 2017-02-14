const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const config = require('../../../js/index').config
const dom = require('../../../js/index').dom
const sinon = require('sinon')
// const getElsStub = sinon.stub(document.body, 'getElementById')

const list = require('../../../js/index').list
import {expect} from "chai";

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

    const setHtmlMock = sinon.mock(dom).expects('setHTML').withArgs(sinon.match.any, expectedHtml).once()

    const result = list.displayData(data)

    expect(result).to.equal(expectedHtml)
    setHtmlMock.verify()
  })


  it('can clear data', () => {
    const data = null
    expect(() => list.displayData(data)).to.throw('displayData: No data')
  })


  it('can display data', () => {
    const clearHtmlMock = sinon.mock(dom).expects('clearHTML').once()
    list.clearData()
    clearHtmlMock.verify()
  })

})
