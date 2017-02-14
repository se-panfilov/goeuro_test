const dom = (function () {
  return {
    getElement(id){
      if (!id) return new Error('getElement: no ID')
      return document.getElementById(id)
    },
    setHTML (elem, content) {
      if (!elem) return new Error('setHTML: no element')
      elem.innerHTML = content
    },
    clearHTML (elem) {
      this.setHTML(elem, '')
    },
    addEventListener (elem, event, cb) {
      if (!elem) return new Error('addEventListener: no element')
      elem.addEventListener(event, event => {
        if (cb) cb(event)
      })
    }
  }
}())

const messages = (function (dom) {
  'use strict'

  const NOTIFICATIONS_BOX_ID = 'notifications'
  const MESSAGE_ELEM_CLASS = 'messages__notification-item'
  const notificationsBoxElem = dom.getElement(NOTIFICATIONS_BOX_ID)

  return {
    showMessage (message, typeClass = '-error', timeout = 3000) {
      const msgHtml = `<div class="${MESSAGE_ELEM_CLASS} ${typeClass}">${message || ''}</div>`
      dom.setHTML(notificationsBoxElem, msgHtml)
      setTimeout(() => {
        dom.clearHTML(notificationsBoxElem)
      }, timeout)
    }
  }
}(dom))

const list = (function (dom) {
  'use strict'

  const LIST_ID = 'repos_list'
  const listElem = dom.getElement(LIST_ID)
  const ITEM_CLASS = 'repos__list-item'

  function createNewItem (text) {
    return `<li class="${ITEM_CLASS}">${text}</li>`
  }

  return {
    clearData () {
      dom.clearHTML(listElem)
    },
    displayData (data) {
      if (!data) throw new Error('displayData: No data')
      // if (data.length > 0) {
      const itemsHtml = data.reduce((c, v) => {
        c += createNewItem(v.name)
        return c
      }, '')
      dom.setHTML(listElem, itemsHtml)
      // }
    }
  }
}(dom))

const search = (function (messages, dom) {
  'use strict'

  const getRequestUrl = (userName) => `https://api.github.com/users/${userName}/repos`

  const STATUS = {
    notFound: 404
  }

  const _p = {
    getUserRepos (userName) {
      const url = getRequestUrl(userName)
      return this.makeRequest(url)
    },
    handleResponse (response) {
      if (response.ok)  return response

      if (response.status === STATUS.notFound) _p.showRequestError('User not found')

      _p.showRequestError('User not found')
      throw new Error(response.statusText)
    },
    getOptions () {
      const CORS_CHECKBOX_ID = 'is_cors'
      const corsCheckbox = dom.getElement(CORS_CHECKBOX_ID)
      const isCors = corsCheckbox.checked

      return {
        method: 'GET',
        mode: isCors ? 'cors' : 'no-cors'
      }
    },
    makeRequest (url) {
      const options = this.getOptions()

      return fetch(url, options).then(response => {
        if (!response.ok) {
          if (response.status === STATUS.notFound) {
            _p.showRequestError('User not found')
          } else {
            const msg = (response.statusText && response.statusText.length > 0) ? response.statusText : 'Error occured'
            _p.showRequestError(msg)
          }
          throw new Error(response.statusText)
        }

        return response.json()
      })
    },
    showRequestError (message) {
      messages.showMessage(message)
    }
  }

  return {
    onSubmit (event, username) {
      event.preventDefault()
      event.stopPropagation()
      return _p.getUserRepos(username)
    }
  }
}(messages, dom))

// eslint-disable-next-line no-unused-vars
const main = (function (search, list, messages, dom) {
  'use strict'

  const FORM_ID = 'search_form'
  const INPUT_ID = 'username'
  const SUBMIT_EVENT = 'submit'

  const formElem = dom.getElement(FORM_ID)
  const inputElem = dom.getElement(INPUT_ID)

  dom.addEventListener(formElem, SUBMIT_EVENT, onSubmit)

  function onSubmit (event) {
    const value = inputElem.value
    if (!value || value.length === 0) throw new Error('Username input is empty')

    list.clearData()
    // search.onSubmit(event, value).then(data => showData(data))
    search.onSubmit(event, value).then(showData)
  }

  function showData (data) {
    if (!data) throw new Error('showData: No data')
    if (data.length === 0) messages.showMessage('User have no repos', '-info')
    list.displayData(data)
    messages.showMessage('Success!', '-success')
  }
}(search, list, messages, dom))

//for testing purpose
if (typeof module === 'object' && module.exports) {
  module.exports = {
    main,
    search,
    messages,
    list
  }
}

