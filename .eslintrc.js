module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-throw-literal': 0, // throw 字符串时报错，故禁止
    quotes: [2, 'single'], //单引号
    semi: [2, 'never'], // 不使用分号
    'space-before-function-paren': 0, // 关闭函数前面加上空格，无法给没有function的函数添加空格
    indent: [2, 2, { SwitchCase: 1 }], // 相同的缩进2
    'comma-dangle': [2, 'never'] // 禁止随时添加逗号,这个很重要。
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
