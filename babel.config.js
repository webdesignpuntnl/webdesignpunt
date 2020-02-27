/* eslint-disable */

module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["prismjs", {
      "languages": ["javascript", "html", "css"],
      "plugins": ["normalize-whitespace"],
      "theme": "okaidia",
      "css": true
    }]
  ]
};