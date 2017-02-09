const messages = (function () {
  'use strict'

  const NOTIFICATIONS_BOX_ID = 'notifications'
  const MESSAGE_ELEM_CLASS = 'messages__notification-item'
  const notificationsBoxElem = document.getElementById(NOTIFICATIONS_BOX_ID)

  return {
    showMessage(message, typeClass = '-error', timeout = 3000) {
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
    displayData (data) {
      if (!data) throw new Error('displayData: No data')
      if (data.length > 0) listElem.innerHTML = data.reduce((c, v) => c += createNewItem(v.name), '')
    }
  }
}())

const search = (function (messages) {
  'use strict'

  const getRequestUrl = (userName) => `https://api.github.com/users/${userName}/repos`

  const _p = {
    getUserRepos (userName) {
      const url = getRequestUrl(userName)
      return this.makeRequest(url)
    },
    handleErrors (response) {
      if (!response.ok) throw new Error(response.statusText)
      return response
    },
    makeRequest (url) {
      return fetch(url)
        .then(this.handleErrors)
        .then(response => response.json())
        .catch(error => this.showRequestError(error))
    },
    showRequestError (error) {
      messages.showMessage('Response error')
      throw new Error(error)
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

    search.onSubmit(event, value).then(data => showData(data))
  })

  function showData (data) {
    console.info(data)
    if (!data) throw new Error('showData: No data')
    if (data.length === 0) messages.showMessage('User have no repos', '-info')
    list.displayData(data)
    messages.showMessage('Success!', '-success')
  }

}(search, list, messages))
