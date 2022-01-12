import FormInputTextConfig from './common/form-input-text.config'
import FormEmptyConfig from './common/form-empty.config'
import FormInputNumberConfig from './common/form-input-number.config'
import FormTextareaConfig from './common/form-textarea.config'

import StaticPlaceholderConfig from './static/static-placeholder.config'

const commonComponents = [
  FormInputTextConfig,
  FormEmptyConfig,
  FormInputNumberConfig,
  FormTextareaConfig
]

const staticComponents = [StaticPlaceholderConfig]

export default [...commonComponents, ...staticComponents]
