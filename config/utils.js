/* eslint-disable */

exports.pages = function() {
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const fs = require('fs')
    const path = require('path')
    const viewsFolder = path.resolve(__dirname, '../src/views/pages')
  
    var pages = []
  
    fs.readdirSync(viewsFolder).forEach(view => {
      const viewName = view.split('.')[0];
  
      const options = {
        filename: `pages/${viewName}.html`,
        template: `src/views/pages/${view}`,
        inject: true
      };
  
      
  
      pages.push(new HtmlWebpackPlugin(options));
    })
  
    return pages;
  }