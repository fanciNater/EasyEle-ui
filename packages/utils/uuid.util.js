/*
 * @Author: fanciNate
 * @Date: 2020-11-20 11:37:36
 * @LastEditTime: 2020-11-20 11:37:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/utils/uuid.util.js
 */
export default {
  guid: function() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
  }
}
