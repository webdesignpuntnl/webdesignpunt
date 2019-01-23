/* eslint-disable */

exports.Errorpages = function() {
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const fs = require('fs')
    const path = require('path')
    const viewsFolder = path.resolve(__dirname, '../src/views/error_docs')
  
    var Errorpages = []
  
    fs.readdirSync(viewsFolder).forEach(view => {
      const viewName = view.split('.')[0];
  
      const options = {
        filename: `error_docs/${viewName}.html`,
        template: `src/views/error_docs/${view}`,
        inject: false,
      };
  
      
  
      Errorpages.push(new HtmlWebpackPlugin(options));
    })
  
    return Errorpages;
  }