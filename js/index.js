const config = {
  notificationsBoxId: 'notifications',
  listId: 'repos_list',
  corsCheckboxId: 'is_cors',
  formId: 'search_form',
  inputId: 'username',
  messageElementClass: 'messages__notification-item',
  listItemClass: 'repos__list-item'
}

const dom = (function () {
  'use strict'

  return {
    getElement(id){
      if (!id) return new Error('getElement: no ID')
      return document.getElementById(id)
    },
    setHTML (elem, content) {
      if (!elem) return new Error('setHTML: no element')
      elem.innerHTML = content
      return elem
    },
    clearHTML (elem) {
      this.setHTML(elem, '')
      return elem
    },
    addEventListener (elem, event, cb) {
      if (!elem) return new Error('addEventListener: no element')
      elem.addEventListener(event, event => {
        if (cb) cb(event)
      })
      return elem
    },
    createElem (tag = 'div', className, text = '') {
      const classes = (className) ? `class="${className}` : ''
      return `<${tag} ${classes}">${text}</${tag}>`
    }
  }
}())

const elements = (function (config, dom) {
  'use strict'

  const messages = {
    elemNotFound: 'No such element',
    noId: 'ID must be specified'
  }

  return {
    _getElem (id) {
      if (!id) throw new Error(messages.noId)
      const elem = dom.getElement(id)
      if (!elem) throw new Error(`${messages.elemNotFound}: ${id}`)
      return elem
    },
    getNotificationsBox () {
      return this._getElem(config.notificationsBoxId)
    },
    getList () {
      return this._getElem(config.listId)
    },
    getCorsCheckbox () {
      return this._getElem(config.corsCheckboxId)
    },
    getForm () {
      return this._getElem(config.formId)
    },
    getInput () {
      return this._getElem(config.inputId)
    },
  }
}(config, dom))

const messages = (function (config, dom, elements) {
  'use strict'

  const notificationsBoxElem = elements.getNotificationsBox()

  return {
    showMessage (message, typeClass = '-error') {
      const msgHtml = dom.createElem('div', `${config.messageElementClass} ${typeClass}`, message)
      dom.setHTML(notificationsBoxElem, msgHtml)
    },
    clearMessage () {
      dom.clearHTML(notificationsBoxElem)
    },
    blinkMessage (message, typeClass, timeout = 3000) {
      this.showMessage(message, typeClass)

      return setTimeout(() => {
        this.clearMessage()
      }, timeout)
    }
  }
}(config, dom, elements))

const list = (function (config, dom, elements) {
  'use strict'

  const listElem = elements.getList()

  return {
    clearData () {
      dom.clearHTML(listElem)
    },
    displayData (data) {
      if (!data) throw new Error('displayData: No data')

      const itemsHtml = data.reduce((c, v) => {
        c += dom.createElem('li', config.listItemClass, v.name)
        return c
      }, '')
      dom.setHTML(listElem, itemsHtml)
      return itemsHtml
    }
  }
}(config, dom, elements))

const search = (function (messages, elements) {
  'use strict'

  const getRequestUrl = (userName) => `https://api.github.com/users/${userName}/repos`

  const STATUS = {
    notFound: 404
  }

  const _p = {
    getUserRepos (userName) {
      if (!userName) throw new Error('getUserRepos: no username')
      const url = getRequestUrl(userName)
      return this.makeRequest(url)
    },
    getOptions () {
      const corsCheckbox = elements.getCorsCheckbox()
      const isCors = corsCheckbox.checked

      return {
        method: 'GET',
        mode: isCors ? 'cors' : 'no-cors'
      }
    },
    onError(response) {
      if (response.status === STATUS.notFound) {
        messages.blinkMessage('User not found')
      } else {
        const msg = (response.statusText && response.statusText.length > 0) ? response.statusText : 'Error occurred'
        messages.blinkMessage(msg)
        throw new Error(msg)
      }
    },
    makeRequest (url) {
      const options = this.getOptions()

      return fetch(url, options).then(response => {
        if (!response.ok) return this.onError(response)

        return response.json()
      })
    }
  }

  return {
    onSubmit (event, username) {
      if (!event) throw new Error('onSubmit: no event provided')
      if (!username) throw new Error('onSubmit: no username provided')
      event.preventDefault()
      event.stopPropagation()
      return _p.getUserRepos(username)
    },
    _p //dirty hack for tests
  }
}(messages, elements))

// eslint-disable-next-line no-unused-vars
const main = (function (search, list, messages, dom, elements) {
  'use strict'

  function onSubmit (event, elem) {
    const value = elem.value
    if (!value || value.length === 0) throw new Error('Username input is empty')

    list.clearData()
    search.onSubmit(event, value).then(showData)
  }

  function showData (data) {
    if (!data) throw new Error('showData: No data')
    if (data.length === 0) messages.blinkMessage('User have no repos', '-info')
    list.displayData(data)
    messages.blinkMessage('Success!', '-success')
  }

  return {
    init () {
      const formElem = elements.getForm()
      const inputElem = elements.getInput()

      dom.addEventListener(formElem, 'submit', event => onSubmit(event, inputElem))
    }
  }
}(search, list, messages, dom, elements))

//for testing purpose
if (typeof module === 'object' && module.exports) {
  module.exports = {
    dom,
    config,
    elements,
    messages,
    list,
    search,
    main
  }
}

