const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const index = require('../../js/index')
import { expect } from 'chai'

console.info(index)

describe('core:', () => {


  it('can work properly in a chain', () => {

    const data = `122\r\r\n390\r\r\n200\r\r\n282\r\r\n382\r\r\n421\r\r\n354\r\r\n334`

    const expectedArr =
      [
        -1, // [122]
        256, // [122, 390]
        200, // [122, 390, 200]
        282, // [390, 200, 282],
        282, // [200, 282, 382],
        382, // [282, 382, 421],
        382, // [382, 421, 354],
        354, // [421, 354, 334],
        344, // [354, 334],
        -1 // [334]
      ]

    const result = core(data)
    console.info(result)

    expect(result).to.have.length(expectedArr.length)
    expect(result[0]).to.deep.equal(expectedArr[0])
    expect(result[1]).to.deep.equal(expectedArr[1])
    expect(result[2]).to.deep.equal(expectedArr[2])
    expect(result[3]).to.deep.equal(expectedArr[3])
    expect(result[4]).to.deep.equal(expectedArr[4])
    expect(result[5]).to.deep.equal(expectedArr[5])
    expect(result[6]).to.deep.equal(expectedArr[6])
    expect(result[7]).to.deep.equal(expectedArr[7])
    expect(result[8]).to.deep.equal(expectedArr[8])
    expect(result[9]).to.deep.equal(expectedArr[9])
  })

})


// "babel-cli": "^6.22.2",
//   "babel-core": "^6.22.1",
