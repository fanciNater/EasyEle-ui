export default {
  editConfig: {
    name: '文本输入',
    icon: 'form-input-text',
    placeholder: '文本输入框'
  },
  renderConfig: {
    render: 'FormInputText',
    edit: 'FormInputText',
    read: 'FormInputText'
  },
  componentConfig: {
    uuid: '16 uuid',
    formValueCode: '16 uuid',
    label: '文本输入',
    placeholder: '请输入文本',
    disabled: false,
    width: 2,
    componentType: 'FORM_INPUT_TEXT'
  },
  conponentSetConfig: [
    'LABEL',
    'WIDTH',
    'MAXLENGTH',
    'DEFAULTVALUE',
    'PLACEHOLDER',
    'DISABLED',
    'REQUIRED'
  ]
}
