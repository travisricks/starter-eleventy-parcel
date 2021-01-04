module.exports = function (eleventyConfig) {
  let markdownIt = require('markdown-it')
  let options = {
    html: true,
    typographer: true,
  }

  let markdownItFurigana = require('furigana-markdown-it')({
    fallbackParens: '()',
    extraSeparators: '-',
    extraCombinators: "'",
  })
  let markdownLib = markdownIt(options).use(markdownItFurigana)

  eleventyConfig.setLibrary('md', markdownLib)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}
