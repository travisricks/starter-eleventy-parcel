const fs = require('fs')

module.exports = function (eleventyConfig) {
  let markdownIt = require('markdown-it')
  let markdownItOptions = {
    html: true,
    typographer: true,
  }

  let markdownItFurigana = require('furigana-markdown-it')({
    fallbackParens: '()',
    extraSeparators: '-',
    extraCombinators: "'",
  })
  let markdownLib = markdownIt(markdownItOptions).use(markdownItFurigana)

  eleventyConfig.setLibrary('md', markdownLib)

  // configure Browsersync to handle 404 routing when using --serve
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('dist/404.html')
          // Add 404 http status code in request header.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      },
    },
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}
