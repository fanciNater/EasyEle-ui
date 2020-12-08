<!--
 * @Author: your name
 * @Date: 2020-12-08 17:57:52
 * @LastEditTime: 2020-12-08 19:22:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/docs/water-mark.md
-->
# EWaterMark 水印
<!-- {.md} -->

---
<!-- {.md} -->

## 如何使用
<!-- {.md} -->

方式一：<!-- {.md} -->
通过<!-- {.md} -->`e-water-mark`标签来引用

<water-mark ref="EWatermarkRef">
<div style="width: 100%; height: 300px"></div>
</water-mark>
::: demo

```html
<e-water-mark ref="EWatermarkRef">
    <div style="width: 100%; height: 300px"></div>
</e-water-mark>
export default {
  mounted() {
    this.$refs.EWatermarkRef.draw({ text: '水印字符串' });
  }
}
```
:::



## Attributes
<!-- {.md} -->
| 参数      | 说明    | 类型      | 参数       | 返回值类型   |
|---------- |-------- |---------- |-------------  |-------- |
| draw     |  绘制水印  | function  | { text, color?, alpha?, angle?, font? }         |   void     |



