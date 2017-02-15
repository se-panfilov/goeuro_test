# goeuro_test

Online demo: https://se-panfilov.github.io/goeuro_test/

# Getting started

Just open `index.html` in modern browser (better in chrome).


I've use cutting edge es6 features without babel, 
so it's probably won't work in some browsers, but has to at least at latest chrome.

## Requirements

Modern browser.


## Testing

Pre-Requirements:

1. [Node.js][1] (Better if it would be [version 7.2.x][2])
2. Npm or [yarn][3] (I use yarn, but npm is also good)

Install dependencies with

```bash
npm install
```

run unit tests

```bash
npm test
```

run e2e tests

```bash
npm e2e
```

### test description

Build a simple client-side app that lists GitHub repositories for a given user.

Use the GitHub API documented here: https://developer.github.com/v3/ (sample request:https://api.github.com/users/goeuro/repos).


[1]: https://nodejs.org/en/
[2]: https://nodejs.org/dist/v7.2.1/node-v7.2.1.pkg
[3]: https://yarnpkg.com/
