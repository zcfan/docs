const cp = require('child_process')
const ghPages = require('gh-pages')
cp.exec('gitbook build', (err) => {
  if (!err) {
    ghPages.publish('./_book', (err) => {
      if (!err) {
        console.log('Publish to gh-pages.')
      }
    })
  }
})
