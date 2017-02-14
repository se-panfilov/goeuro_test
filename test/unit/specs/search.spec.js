const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../../index.html', 'utf8')
const jsdom = require('jsdom-global')()
document.write(html)
const elements = require('../../../js/index').elements
const messages = require('../../../js/index').messages
const sinon = require('sinon')
const fetchMock = require('fetch-mock')

const search = require('../../../js/index').search
import {expect} from "chai";

describe('search:', () => {

  describe('getUserRepos.', () => {

    it('can get user repos', () => {
      const username = 'randome123'
      const getExpectedUrl = (userName) => `https://api.github.com/users/${userName}/repos`
      const url = getExpectedUrl(username)
      const mock = sinon.mock(search._p)
      mock.expects('makeRequest').withExactArgs(url).once()

      search._p.getUserRepos(username)

      mock.verify()
      mock.restore()
    })

    it('should throw error when no username', () => {
      const data = null
      expect(() => search._p.getUserRepos(data)).to.throw('getUserRepos: no username')
    })

  })

  describe('getOptions', () => {

    it('can set cors param to true', () => {
      const expectedResult = {
        method: 'GET',
        mode: 'cors'
      }

      const mock = sinon.mock(elements)
      mock.expects('getCorsCheckbox').returns({checked: true})
      const result = search._p.getOptions()

      expect(result).to.deep.equal(expectedResult)

      mock.verify()
      mock.restore()
    })

    it('can set cors param to false', () => {
      const expectedResult = {
        method: 'GET',
        mode: 'no-cors'
      }

      const mock = sinon.mock(elements)
      mock.expects('getCorsCheckbox').returns({checked: false})
      const result = search._p.getOptions()

      expect(result).to.deep.equal(expectedResult)

      mock.verify()
      mock.restore()
    })
  })

  describe('onError', () => {
    it('show not found error', () => {
      const response = {
        status: 404
      }

      const mock = sinon.mock(messages)
      mock.expects('blinkMessage').withExactArgs('User not found').once()

      search._p.onError(response)

      mock.verify()
      mock.restore()
    })

    it('show common found error', () => {
      const response = {
        status: 500
      }

      const expectedMsg = 'Error occurred'

      const mock = sinon.mock(messages)
      mock.expects('blinkMessage').withExactArgs(expectedMsg).once()

      expect(() => search._p.onError(response)).to.throw(expectedMsg)

      mock.verify()
      mock.restore()
    })
  })

  describe('makeRequest', () => {
    it('shall make request', () => {
      const url = 'some.some.some'

      const mock = sinon.mock(search._p)
      mock.expects('getOptions').once()

      const expectedResult = {result: true}

      const _fetchMock = fetchMock.get(url, expectedResult)
      search._p.makeRequest(url)

      expect(_fetchMock.called(url)).to.be.true

      mock.verify()
      _fetchMock.restore()
      mock.restore()
    })
  })

  describe('onSubmit', () => {
    it('happy path', () => {
      const event = {
        preventDefault: function () {
        },
        stopPropagation: function () {
        }
      }
      const username = 'username123'

      const eventMock = sinon.mock(event)
      eventMock.expects('preventDefault').once()
      eventMock.expects('stopPropagation').once()

      const mock = sinon.mock(search._p)
      mock.expects('getUserRepos').withExactArgs(username).once()

      search.onSubmit(event, username)

      eventMock.verify()
      eventMock.restore()
      mock.verify()
      mock.restore()
    })

    it('shall throw error when no event', () => {
      const username = 'username123'
      expect(() => search.onSubmit(null, username)).to.throw('onSubmit: no event provided')
    })

    it('shall throw error when no username', () => {
      const event = {}
      expect(() => search.onSubmit(event, null)).to.throw('onSubmit: no username provided')
    })
  })

})
