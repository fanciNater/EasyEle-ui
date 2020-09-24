# vue-lib-starter

[文档地址](https://juejin.im/post/5d7860b0f265da03bc12a3d2)

[组件库官网](http://47.114.52.172/easyele-ui/dist/index.html)

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

## npm-package依赖包名臣 easyele-ui
### 安装依赖
```
npm install easyele-ui --save
```

### 安装 babel-plugin-import
```
npm installl babel-plugin-import --save-dev
```
或
```
cnpm installl babel-plugin-import --save-dev
```

### 配置babel.config.js

```javascript
const EasyEleUIPlugin = ['import',
  {
    // 组件库的名字,可以根据你发布的库的package.json的name自行更改
    libraryName: 'easyele-ui',

    // 默认打包是lib,不用更改
    libraryDirectory: 'lib',

    // 如果有样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
    style: (name, file) => {
      const libDirIndex = name.lastIndexOf('/')
      const libDir = name.substring(0, libDirIndex)
      const fileName = name.substr(libDirIndex + 1)
      return `${libDir}/theme/${fileName}.css`;
    }
  },
  'easyele-ui'
]
```