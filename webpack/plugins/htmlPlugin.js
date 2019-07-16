const
  path              = require('path'),
  manifest          = require('../manifest'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const titles = {
  'index': '智慧运营看板系统',
  '01-property': '物业服务',
  '02-repossession': '预约收楼',
  '03-app_payment': 'App支付',
  '04-reading': '阅森活',
  'blank': 'Blank',
  'buttons': 'Buttons',
  'charts': 'Charts',
  'datatable': 'Datatable',
  'forms': 'Forms',
  'google-maps': 'Google Maps',
  'signin': 'Signin',
  'signup': 'Signup',
  'ui': 'UI',
  'vector-maps': 'Vector Maps',
  '404': '404',
  '500': '500',
  'basic-table': 'Basic Table',
};

module.exports = Object.keys(titles).map(title => {
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    inject: true,
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  });
});
