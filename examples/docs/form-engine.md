<!--
 * @Author: fanciNate
 * @Date: 2022-01-10 22:33:44
 * @LastEditTime: 2022-01-10 22:36:06
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/docs/form-engine.md
-->
# FormEngine 表单引擎

<!-- {.md} -->

---

<!-- {.md} -->

## 如何使用

<!-- {.md} -->

<!-- {.md} --> 通过<!-- {.md} -->`e-form-engine`标签来引用

<template>
  <div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList"></e-form-engine>
    </div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList" renderSence="edit"></e-form-engine>
    </div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList" renderSence="read"></e-form-engine>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formConfigList: [],
        formData: {}
      }
    }
  }
</script>

::: demo

```html
<template>
  <div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList"></e-form-engine>
    </div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList" renderSence="edit"></e-form-engine>
    </div>
    <div>
      <e-form-engine v-model="formData" :formConfigList="formConfigList" renderSence="read"></e-form-engine>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formConfigList: [],
        formData: {}
      }
    }
  }
</script>
```

:::

## Attributes

<!-- {.md} -->

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |

## Event

<!-- {.md} -->

| 参数 | 说明 | 类型 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |


## Method

<!-- {.md} -->

| 参数            | 说明 | 类型               | 可选值 | 描述             |
| --------------- | ---- | ------------------ | ------ | ---------------- |

