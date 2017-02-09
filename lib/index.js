(function () {
  'use strict'

  function onSubmit (e) {
    e.preventDefault()
    event.stopPropagation()
    getUserRepos()
  }

  const getRequestUrl = (userName) => `https://api.github.com/users/${userName}/repos`

  function getUserRepos (userName) {
    const url = getRequestUrl(userName)
    mareRequest(url)
  }

  function mareRequest (url) {
    return fetch(url).then(r => {
      console.info(123)
      console.info(r)
    })
  }

}())


