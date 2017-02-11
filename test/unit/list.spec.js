const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const list = require('../../js/index').list
import {expect} from "chai";

describe('messages:', () => {

  const LIST_ID = 'repos_list'
  //
  // it('can clear data', () => {
  //   const elem = document.getElementById(LIST_ID)
  //
  //   expect(elem.textContent).to.equal('')
  //   list.clearData()
  //   expect(elem.textContent).to.equal('')
  //
  //   elem.innerHTML = 'asdasdsd'
  //   list.clearData()// TODO (S.Panfilov)
  //   expect(elem.textContent).to.equal('')
  // })

  // it('can displayData', () => {
  //   const elem = document.getElementById(LIST_ID)
  //
  //   expect(elem.textContent).to.equal('')
  //   list.displayData(message)
  //   expect(elem.textContent).to.equal('')
  //
  //   elem.innerHTML = 'asdasdsd'
  //   list.displayData(message)
  //   expect(elem.textContent).to.equal('')
  // })

  it('throw error on empty data', () => {
    expect(() => list.displayData()).to.throw('displayData: No data')
  })


})
