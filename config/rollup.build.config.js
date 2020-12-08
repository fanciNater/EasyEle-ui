/*
 * @Author: fanciNate
 * @Date: 2020-09-10 10:56:36
 * @LastEditTime: 2020-11-20 11:33:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/config/rollup.build.config.js
 */
module.exports = {
  esDir: 'es',

  formatTypeList: [
    { format: 'cjs', min: false, suffix: '.js' },
    // { format: 'cjs', min: true, suffix: '.common.min.js' },
    // { format: 'umd', min: false, suffix: '.umd.js' },
    // { format: 'umd', min: true, suffix: '.umd.min.js' }
    // { format: 'es', min: false, suffix: '.js' }
    // { format: 'es', min: true, suffix: '.es.min.js' }
  ],
  addons: [
    // {
    //   min: false,
    //   format: 'es',
    //   suffix: '.js',
    //   input: 'src/index.js',
    //   output: 'index'
    // },
    // {
    //   min: false,
    //   format: 'cjs',
    //   suffix: '.js',
    //   input: 'src/index.js',
    //   output: 'index'
    // }
  ]
}
