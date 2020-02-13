import Vue from 'vue'

const componentVue = require.context(
  '../components',
  false,
  /.vue$/
  //找到components文件夹下以.vue命名的文件
)
const componentIndexJS = require.context(
  '../components',
  true,
  /index.js$/
  //找到components文件夹下以.vue命名的文件
)

function getFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

//查询目录下index.js的文件
componentIndexJS.keys().forEach(fileName => {
  let list = componentIndexJS(fileName)
  for (var val in list) {
    Vue.component(val, list[val])
  }
})

//查询非目录以.vue的文件
componentVue.keys().forEach(fileName => {
  const componentConfig = componentVue(fileName)
  const componentName = getFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
