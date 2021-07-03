module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions' // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 75, // 设计稿宽度的1/10
      unitPrecision: 6, // 小数位
      minPixelValue: 1, // 转换的最小单位
      // selectorBlackList: ['.mint-', '.mi-'], // 忽略的样式, 正则
      mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
      exclude: [/^node_modules$/], // (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部，正则
    }
  }
}
