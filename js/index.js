const messages = (function () {
  'use strict'

  const NOTIFICATIONS_BOX_ID = 'notifications'
  const MESSAGE_ELEM_CLASS = 'messages__notification-item'
  const notificationsBoxElem = document.getElementById(NOTIFICATIONS_BOX_ID)

  return {
    showMessage (message, typeClass = '-error', timeout = 3000) {
      notificationsBoxElem.innerHTML = `<div class="${MESSAGE_ELEM_CLASS} ${typeClass}">${message}</div>`
      setTimeout(() => {
        notificationsBoxElem.innerHTML = ''
      }, timeout)
    }
  }
}())

const list = (function () {
  'use strict'

  const LIST_ID = 'repos_list'
  const listElem = document.getElementById(LIST_ID)
  const ITEM_CLASS = 'repos__list-item'

  function createNewItem (text) {
    return `<li class="${ITEM_CLASS}">${text}</li>`
  }

  return {
    clearData () {
      listElem.innerHTML = ''
    },
    displayData (data) {
      if (!data) throw new Error('displayData: No data')
      if (data.length > 0) listElem.innerHTML = data.reduce((c, v) => {
        c += createNewItem(v.name)
        return c
      }, '')
    }
  }
}())

const search = (function (messages) {
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
      const mode = document.getElementById('is_cors').checked
      return {
        method: 'GET',
        mode: mode ? 'cors' : 'no-cors'
      }
    },
    makeRequest (url) {
      const options = this.getOptions()

      return fetch(url).then(response => {
        let json = response.json()
        if (response.ok) return json

        if (response.status === STATUS.notFound) _p.showRequestError('User not found')

        return json.then(err => {
          throw new Error(err)
        })
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
}(messages))

// eslint-disable-next-line no-unused-vars
const main = (function (search, list, messages) {
  'use strict'

  const FORM_ID = 'search_form'
  const INPUT_ID = 'username'
  const SUBMIT_EVENT = 'submit'

  const formElem = document.getElementById(FORM_ID)
  const inputElem = document.getElementById(INPUT_ID)

  formElem.addEventListener(SUBMIT_EVENT, event => {
    const value = inputElem.value
    if (!value || value.length === 0) throw new Error('Username input is empty')

    list.clearData()
    search.onSubmit(event, value).then(data => showData(data))
  })

  function showData (data) {
    if (!data) throw new Error('showData: No data')
    if (data.length === 0) messages.showMessage('User have no repos', '-info')
    list.displayData(data)
    messages.showMessage('Success!', '-success')
  }
}(search, list, messages))

//for testing purpose
if (typeof module === 'object' && module.exports) {
  module.exports = {
    main,
    search,
    messages,
    list
  }
}

