export default {
  editConfig: {
    name: '文本域',
    icon: 'form-input-text',
    placeholder: '文本域输入框'
  },
  renderConfig: {
    render: 'FormTextarea',
    edit: 'FormTextarea',
    read: 'FormTextarea'
  },
  componentConfig: {
    uuid: '16 uuid',
    formValueCode: '16 uuid',
    label: '文本域',
    placeholder: '请输入文本',
    disabled: false,
    width: 4,
    componentType: 'FORM_TEXTAREA'
  },
  conponentSetConfig: ['LABEL', 'MAXLENGTH', 'DEFAULTVALUE', 'PLACEHOLDER', 'DISABLED', 'REQUIRED']
}
