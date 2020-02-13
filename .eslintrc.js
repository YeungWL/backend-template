module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    /* ------- 参数：0 关闭，1 警告，2 错误 -------*/
    "indent": [0, 2], // 代码缩进  https://eslint.org/docs/2.0.0/rules/indent
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //debugger 调试代码未删除
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-extra-boolean-cast": 2, //多余的感叹号转布尔型，禁止不必要的布尔转换。
    "no-empty": 1, //空代码块
    "no-global-assign": 2,
    "no-var": 0, //用let或const替代var
    "no-const-assign": 2, //不允许const重新赋值
    "no-class-assign": 2, //不允许对class重新赋值
    "no-constant-condition": 2, //常量作为条件
    "no-dupe-args": 2, //参数重复
    "no-dupe-keys": 2, //对象属性重复,
    "no-duplicate-case": 2, //不允许在switch语句的case子句中使用重复的测试表达式
    "no-empty-character-class": 2, //正则无法匹配任何值
    "no-invalid-regexp": 2, //无效的正则
    "no-func-assign": 2, //函数被赋值
    "valid-typeof": 2, //无效的类型判断
    "no-unreachable": 2, //不可能执行到的代码
    "no-unexpected-multiline": 2, //行尾缺少分号可能导致一些意外情况
    "no-sparse-arrays": 2, //数组中多出逗号
    "no-shadow-restricted-names": 2, //关键词与命名冲突
    "no-undef": 2, //变量未定义
    "no-unused-vars": [1, { 'vars': 'all', 'args': 'none' }], //变量定义后未使用
    "no-cond-assign": 2, //条件语句中禁止赋值操作
    "no-native-reassign": 2, //禁止覆盖原生对象
    "no-mixed-spaces-and-tabs": 2, //不允许使用混合空格和制表符进行缩进
    'arrow-spacing': [2, { 'before': true, 'after': true }],

    /* ------- 代码风格 -------*/
    //object直接量建议写法 : 后一个空格前面不留空格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],
    "block-scoped-var": 2, //变量应在外部上下文中声明，不应在{}代码块中
    //换行调用对象方法  点操作符应写在行首
    "dot-location": [1, "property"],
    "no-lone-blocks": 2, //多余的{}嵌套
    "no-labels": [2, { 'allowLoop': false, 'allowSwitch': false }], //无用的标记
    "no-extend-native": 2, //禁止扩展原生对象
    "no-floating-decimal": 1, //浮点型需要写全 禁止.1 或 2.写法
    "no-loop-func": 2, //禁止在循环体中定义函数
    "no-self-compare": 2, //不允与自己比较作为条件
    "no-sequences": 2, //禁止可能导致结果不明确的逗号操作符
    "no-throw-literal": 2, //禁止抛出一个直接量 应是Error对象
    "no-return-assign": [2, "except-parens"],
    "no-redeclare": 2, //不允许重复声明
    "no-unused-expressions": [0, { "allowShortCircuit": true, "allowTernary": true }], //不执行的表达式
    "no-useless-call": 2, //无意义的函数call或apply
    "no-useless-concat": 1, //无意义的string concat
    "no-with": 1, //禁用with
    "space-infix-ops": 1, //操作符前后空格
    "curly": 0, //if、else、while、for代码块用{}包围
    'block-spacing': 2,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
