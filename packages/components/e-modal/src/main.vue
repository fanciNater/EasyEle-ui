<!--
 * @Author: fanciNate
 * @Date: 2021-04-22 13:02:10
 * @LastEditTime: 2021-04-22 13:19:48
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/EasyEle-ui/packages/components/e-modal/src/main.vue
-->
<template>
  <div class="e-modal">
    <el-dialog
      :append-to-body="appendToBody"
      :destroy-on-close="destroyOnClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :custom-class="wrapperClass + ' e-modal-wrapper'"
      :show-close="false"
      :visible="modalVisible"
      lock-scroll
      v-bind="$attrs"
      :width="modalWidth"
      @update:visible="updateModalVisible"
      v-on="$listeners"
      @closed="closeModal"
    >
      <template v-slot:title class="e-modal-header">
        <div v-if="!$scopedSlots.title" class="modal-header-row">
          <label class="header-title">{{ title }}</label>
          <template v-if="headerType === 'search'">
            <div class="search-block">
              <el-input
                v-model="searchStr"
                placeholder="回车搜索字段名称"
                @keyup.enter.native="handlerDoSearch"
              >
                <e-svg-icon
                  slot="prefix"
                  style="marginBottom=10px"
                  class="header-search-icon"
                  name="x-lib-search"
                ></e-svg-icon>
              </el-input>
            </div>
          </template>
          <template v-else>
            <div class="block"></div>
          </template>
          <e-svg-icon
            class="header-close-icon"
            name="close-icon"
            @click.native="closeBtnClick"
          ></e-svg-icon>
        </div>
        <slot v-else name="title"></slot>
      </template>
      <slot></slot>
      <template v-slot:footer class="e-modal-footer">
        <template v-if="!$scopedSlots.footer">
          <el-button
            :disabled="cancelConfig.disabled"
            :loading="cancelButtonLoading"
            @click="cancelButtonClick"
          >
            {{ cancelConfig && cancelConfig.title }}
          </el-button>
          <el-button
            ref="okBtnRef"
            type="primary"
            :disabled="okConfig.disabled"
            :loading="okButtonLoading"
            @click="okButtonClick"
          >
            {{ okConfig && okConfig.title }}
          </el-button>
        </template>
        <slot v-else name="footer"></slot>
      </template>
    </el-dialog>
    <div v-if="modalVisible && customModalBg" class="custom-modal">
    </div>
  </div>
</template>
<script>
import ElDialog from 'element-ui/lib/dialog'
import ESvgIcon from '../../e-svg-icon/src/main'

export default {
  name: 'EModal',
  components: {
    ElDialog,
    ESvgIcon
  },
  props: {
    width: {
      required: true,
      default: 'small',
      validator: function(value) {
        return ['small', 'middle', 'large'].includes(value) || !isNaN(value)
      }
    },
    modalVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    okConfig: {
      type: Object,
      default: function() {
        return {
          title: '确定'
        }
      }
    },
    cancelConfig: {
      type: Object,
      default: function() {
        return {
          title: '取消'
        }
      }
    },
    closeConfig: {
      type: Object,
      default: function() {
        return {}
      }
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    headerType: {
      type: String
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    customModalBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      okButtonLoading: false,
      cancelButtonLoading: false,
      searchStr: '',
      modalShowVisible: true
    }
  },
  computed: {
    modalWidth() {
      if (this.width === 'small') {
        return '352px'
      } else if (this.width === 'middle') {
        return '672px'
      } else if (this.width === 'large') {
        return '992px'
      } else {
        return this.width + 'px'
      }
    }
  },
  watch: {
    modalVisible: {
      handler: function(newVal, oldVal) {
        if (!newVal) {
          clearTimeout(timer)
          var timer = setTimeout(() => {
            document.body.style.overflowY = 'auto'
            document.body.style.width = '100%'
          }, 200)
          console.log(newVal, oldVal)
          this.searchStr = ''
          this.okButtonLoading = false
          if (this.destroyOnClose) {
            setTimeout(() => {
              this.modalShowVisible = false
            })
          }
        } else {
          document.body.style.overflowY = 'hidden'
          document.body.style.width = `calc(100% - ${this.getScrollbarWidth()}px)`
          // 按回车直接提交
          if (this.okConfig && this.okConfig.enterSubmit) {
            if (this.$refs.okBtnRef) {
              setTimeout(() => {
                this.$refs.okBtnRef.$el.focus()
              })
            }
          }
          if (this.destroyOnClose) {
            setTimeout(() => {
              this.modalShowVisible = true
            })
          }
        }
      }
    },
    searchStr: {
      handler: function(newVal, oldVal) {
        if (!newVal && this.modalVisible) {
          this.$emit('search', {
            searchStr: newVal
          })
        }
      }
    }
  },
  created() {},
  mounted() {
    console.log(this.$scopedSlots, '$scopedSlots')
  },
  methods: {
    getScrollbarWidth() {
      try {
        var outer = document.createElement('div')
        outer.style.visibility = 'hidden'
        outer.style.width = '100px'
        outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps

        document.body.appendChild(outer)

        var widthNoScroll = outer.offsetWidth
        // force scrollbars
        outer.style.overflow = 'scroll'

        // add innerdiv
        var inner = document.createElement('div')
        inner.style.width = '100%'
        outer.appendChild(inner)

        var widthWithScroll = inner.offsetWidth

        // remove divs
        outer.parentNode.removeChild(outer)

        return widthNoScroll - widthWithScroll
      } catch (error) {
        return 0
      }
    },
    closeModal() {},
    updateModalVisible($event) {
      this.$emit('update:modalVisible', $event)
    },
    // keyUpEvent($event) {
    //   if ($event.keyCode === 13) {
    //     debugger
    //   }
    // },
    okButtonClick($event) {
      if (!this.cancelConfig || !this.okConfig.onOk) {
        this.$emit('update:modalVisible', false)
      } else {
        const result = this.okConfig.onOk($event)
        // 返回true，阻止关闭
        if (!(result instanceof Promise) && result !== true) {
          this.$emit('update:modalVisible', false)
        } else if (result instanceof Promise) {
          // 设置按钮为loading状态
          this.okButtonLoading = true
          result
            .then((res) => {
              if (res !== true) {
                this.$emit('update:modalVisible', false)
              }
            })
            .finally((res) => {
              setTimeout(() => {
                this.okButtonLoading = false
              }, 1000)
            })
        }
      }
    },
    cancelButtonClick($event) {
      if (!this.cancelConfig || !this.cancelConfig.onCancel) {
        this.$emit('update:modalVisible', false)
      } else {
        const result = this.cancelConfig.onCancel($event)
        // 返回true，阻止关闭
        if (!(result instanceof Promise) && result !== true) {
          this.$emit('update:modalVisible', false)
        } else if (result instanceof Promise) {
          // 设置按钮为loading状态
          this.okButtonLoading = true
          result
            .then((res) => {
              if (res !== true) {
                this.$emit('update:modalVisible', false)
              }
            })
            .finally((res) => {
              this.okButtonLoading = false
            })
        }
      }
    },
    closeBtnClick($event) {
      if (!this.closeConfig || !this.closeConfig.onClose) {
        this.cancelButtonClick($event)
      } else {
        const result = this.closeConfig.onClose($event)
        // 返回true，阻止关闭
        if (!(result instanceof Promise) && result !== true) {
          this.$emit('update:modalVisible', false)
        } else if (result instanceof Promise) {
          // 点击关闭的阻断，只能用在弹出新的弹窗，一般不建议
          console.warn('点击关闭的阻断，只能用在弹出新的弹窗，一般不建议')
          result
            .then((res) => {
              if (res !== true) {
                this.$emit('update:modalVisible', false)
              }
            })
            .finally((res) => {})
        }
      }
    },
    handlerDoSearch() {
      this.$emit('search', {
        searchStr: this.searchStr
      })
    }
  }
}
</script>
