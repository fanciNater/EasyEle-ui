# EasyeleUi

<!-- [组件库官网](http://47.114.52.172/easyele-ui/dist/index.html) -->

## 安装依赖
```
yarn install
```

### 运行example
```
yarn run serve
```


### 运行测试用例
```
yarn run test:unit
```

### 使用vue-cli3 打包库
```
yarn run  lib:cli
```

### 使用rollup打包库
```
yarn run  lib
```

### 格式化全部js文件
```
yarn run  lint:prettier
```

### 格式化全部css文件
```
yarn run  lint:css
```
### 运行项目文档
```
yarn run  docs:dev
```

### 打包项目文档
```
yarn run  docs:build
```

### 生成修改日志
```
yarn run  version
```

## 项目上使用*easyele-ui*
### 安装依赖
```
npm install easyele-ui --save
```

### 安装 babel-plugin-import
```
npm install babel-plugin-import --save-dev
```
或
```
cnpm install babel-plugin-import --save-dev
```

### 配置babel.config.js

```javascript
const EasyEleUIPlugin = ['import',
  {
    libraryName: 'easyele-ui',
    libraryDirectory: 'lib',
    style: (name, file) => {
      const libDirIndex = name.lastIndexOf('/')
      const libDir = name.substring(0, libDirIndex)
      const fileName = name.substr(libDirIndex + 1)
      return `${libDir}/theme/${fileName}.css`;
    }
  },
  'easyele-ui'
]

...

module.exports = {
  ...
  plugins: [
    EasyEleUIPlugin
  ]
};

```

### 如何引入插件

*创建一个js文件，按需引入组件，插件，或指令，如下示例*
```javascript
import Vue from 'vue'
import {
    TestModule
} from 'easyele-ui'
import ERequestPlugin from 'easyele-ui/lib/e-request-plugin'
import EEventOutsideDirective from 'easyele-ui/lib/e-event-outside-directive'

Vue.use(TestModule)
Vue.use(EEventOutsideDirective)
Vue.use(ERequestPlugin, {
    baseURL: process.env.VUE_APP_BASE_DOMAIN,
    timeout: 15000,
    headers: {
        'Accept-Language': 'zh-CN'
    },
    needShowMessage: true,
    businessErrorCatch: function (
        failRes,
        response,
        needShowMessage
    ) {
        if (needShowMessage) {

        }
        if (failRes.bizCode === '3027') {

        }
    },
    errorCatch: function (err, needShowMessage) {
      if (!err.response) {
          return true
      }
      if (err.response && err.response.status === 401) {

          return true
      } else if (err.response.status === 404) {

      } else if (err.response.status === 423) {

          return true
      } else if (err.response.status === 500) {

          return true
      } else if (err.response.status === 402) {

          return true
      } else if (err.response.status === 410) { // 版本更新

      } else {
          return true
      }
    }
})
```
