const domHelper = (function () {
  return {
    addClass (elem, className) {
      if (elem.classList) {
        elem.classList.add(className)
      } else {
        elem.className += ' ' + className
      }
    },
    removeClass (elem, className) {
      if (elem.classList) {
        elem.classList.remove(className)
      } else {
        elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
      }
    },
    hasClass (elem, className) {
      if (elem.classList) {
        return elem.classList.contains(className)
      } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className)
      }
    },
    toggleClass (elem, className) {
      const method = (this.hasClass(elem, className)) ? this.removeClass : this.addClass
      method(elem, className)
    }
  }
}())

const list = (function (domHelper) {
  'use strict'

  const LIST_ID = 'repos_list'
  const DEFAULT_ITEM_ID = 'default_list_item'

  const listElem = document.getElementById(LIST_ID)
  const defaultListItemElem = document.getElementById(DEFAULT_ITEM_ID)
  const itemClass = 'repos__list-item'
  const hiddenItemClass = '-hidden'

  function toggleElemDisplay (elem) {
    domHelper.toggleClass(elem, hiddenItemClass)
  }

  function createNewItem (text) {
    return `<li class="${itemClass}">${text}</li>`
  }

  return {
    displayData (data) {
      console.info(data.map(v => createNewItem(v.name)))
      listElem.innerHTML = data.map(v => createNewItem(v.name))
    }
  }

}(domHelper))

const search = (function () {
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
      throw new Error('Request error')
    }
  }


  function prepareData () {

  }

  function showMessage (msg) {

  }

  return {
    onSubmit (event, username) {
      event.preventDefault()
      event.stopPropagation()
      return _p.getUserRepos(username)
    }
  }
}())

const main = (function (search, list) {
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
    // TODO (S.Panfilov)
    list.displayData(data)
  }

}(search, list))
