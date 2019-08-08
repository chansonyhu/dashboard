const
  path              = require('path'),
  manifest          = require('../manifest'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const titles = {
  'index': '登录',
  '00-app_info': '智慧运营看板系统',
  '01-coupon': '收楼优惠券',
  '02-repossession': '预约收楼',
  '03-app_payment': 'App支付',
  '04-reading': '阅森活',
  '04-hotels': '酒店数据',
  '05-sales': '销售数据',
  'signup': 'Signup',
  'login': 'Login',
  '404': '404',
  '500': '500',
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
