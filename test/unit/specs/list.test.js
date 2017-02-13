// const list = require('../../js/index').list
import {expect} from "chai";
// const expect = require('chai').expect
// const list = require('../../../js/index').list

describe("DOM Tests", function () {
  var el = document.createElement("div")
  el.id = "myDiv"
  el.innerHTML = "Hi there!"
  el.style.background = "#ccc"
  document.body.appendChild(el)
  console.log(123)

  var myEl = document.getElementById('myDiv')
  it("is in the DOM", function () {
    expect(myEl).to.not.equal(null)
  })

  it("is a child of the body", function () {
    expect(myEl.parentElement).to.equal(document.body)
  })

  it("has the right text", function () {
    expect(myEl.innerHTML).to.equal("Hi there!")
  })

  it("has the right background", function () {
    expect(myEl.style.background).to.equal("rgb(204, 204, 204)")
  })
})


// const fs = require('fs')
// const html = fs.readFileSync(__dirname + '/../../index.html', 'utf8')
// const jsdom = require('jsdom-global')()
// document.write(html)
// const list = require('../../js/index').list
// const expect = require('chai').expect
//
// // const cheerio = require('cheerio')
// // const $ = cheerio.load(html)
// // $.html()
//
// // const MockBrowser = require('mock-browser').mocks.MockBrowser
// // const mock = new MockBrowser()
// //
// // global.window = MockBrowser.createWindow()
// // global.document = MockBrowser.createDocument()
// // global.document.getElementById = function () {
// //   return {}
// // }
//
// // const list = require('../../js/index').list
// // const expect = require('chai').expect
//
// describe('messages:', () => {
//
//   const LIST_ID = 'repos_list'
//
//   it('can clear data', () => {
//     let elem = document.getElementById(LIST_ID)
//     elem.innerHTML = '123'
//
//     // expect(elem.textContent).to.equal('')
//     console.info(elem.textContent)
//     // list.clearData()
//     // expect(elem.textContent).to.equal('')
//
//     // elem.innerHTML = 'asdasdsd'
//     list.clearData()// TODO (S.Panfilov)
//     // expect(elem.textContent).to.equal('')
//   })
//
//   // it('can displayData', () => {
//   //   const elem = document.getElementById(LIST_ID)
//   //   const elem2 = $(`#${LIST_ID}`)[0]
//   //   console.info(elem2)
//   //   const item_class = 'asdasd'
//   //   const text = 'qqq'
//   //
//   //   const data = [
//   //     `<li class="${item_class}">${text}</li>`,
//   //     `<li class="${item_class}">${text}</li>`
//   //   ]
//   //
//   //   expect(elem.innerHTML).to.equal('')
//   //   list.displayData(data)
//   //
//   //   console.info(123123)
//   //   console.info(elem.innerHTML)// TODO (S.Panfilov)
//   //   console.info(123123)
//   //
//   //   expect(elem.innerHTML).to.equal(`<li class="${item_class}">${text}</li><li class="${item_class}">${text}</li>`)
//   // })
//   //
//   // it('throw error on empty data', () => {
//   //   expect(() => list.displayData()).to.throw('displayData: No data')
//   // })
//
//
// })
