// 基础组件
import FormInputText from './common/form-input-text/index'
import FormEmpty from './common/form-empty'
import FormInputNumber from './common/form-input-number'
import FormTextarea from './common/form-textarea'

// 静态组件
import FormStaticPlaceholder from './static/static-placeholder'

// 基础组件集合
const commonComponents = {
  FormInputText,
  FormEmpty, // 占位符
  FormInputNumber,
  FormTextarea
}

// 静态组件集合
const staticComponents = {
  FormStaticPlaceholder
}

// 布局组件集合
const layoutComponents = {}

export default {
  ...commonComponents,
  ...staticComponents,
  ...layoutComponents
}
