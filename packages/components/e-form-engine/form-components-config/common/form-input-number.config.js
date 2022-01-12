export default {
  editConfig: {
    name: '数字输入',
    icon: 'num-icon',
    placeholder: '数字输入框'
  },
  renderConfig: {
    render: 'FormInputNumber',
    edit: 'FormInputNumber',
    read: 'FormInputNumber'
  },
  componentConfig: {
    uuid: '16 uuid',
    formValueCode: '16 uuid',
    label: '数字输入',
    placeholder: '请输入数字',
    disabled: false,
    width: 2,
    componentType: 'FORM_INPUT_NUMBER'
  },
  conponentSetConfig: [
    'LABEL',
    'WIDTH',
    // 'MAXLENGTH',
    // 'DEFAULTVALUE',
    'PLACEHOLDER',
    'DISABLED',
    'REQUIRED'
  ]
}
