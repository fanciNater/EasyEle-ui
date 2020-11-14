<template>
  <div class="e-ellipsis">
    <el-tooltip
      v-if="mode === 'origin'"
      v-model="ellipsis"
      placement="top"
      :popper-class="wrapperClass + ' e-ellipsis-tooltip ' + tipClass"
      :manual="true"
      @mouseenter.native="showTooltip"
      @mouseleave.native="debounceHideTooltip"
    >
      <div slot="content" class="x-tip-content">
        {{ label }}
      </div>
      <div :ref="'textOverflow'" class="tip-overflow">
        {{ label }}
      </div>
    </el-tooltip>
    <el-tooltip
      v-else
      placement="top"
      :popper-class="wrapperClass + 'e-ellipsis-tooltip'"
      :disabled="!labelClamped"
    >
      <div slot="content" class="x-tip-content">
        {{ label }}
      </div>
      <div>
        <v-clamp
          ref="clamp"
          v-bind="$attrs"
          :max-lines="maxLines"
          :line-height="1"
          :autoresize="autoresize"
          @clampchange="clampChange"
        >
          {{ label }}
        </v-clamp>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
import VClamp from 'vue-clamp'
import ElToolTip from 'element-ui/lib/tooltip'

export default {
  name: 'XEllipsis',
  components: {
    VClamp,
    ElToolTip
  },
  props: {
    mode: {
      type: String,
      default: 'clamp'
    },
    maxLines: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ''
    },
    autoresize: {
      type: Boolean,
      default: true
    },
    wrapperClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelClamped: false,

      ellipsis: false,
      tipClass: '',
      keepState: false,
      hideTooltipFun: this.$lodash.debounce(
        () => {
          if (this.keepState) {
          } else {
            this.ellipsis = false
          }
        },
        200,
        { maxWait: 400 }
      )
    }
  },
  watch: {
    label: {
      handler: function(val, oldval) {
        this.$nextTick(() => {
          this.$refs.clamp && this.$refs.clamp.cleanUp()
        })
      }
    }
  },
  mounted() {},
  methods: {
    showTooltip() {
      const textDiv = this.$refs.textOverflow
      this.tipClass = 'tip_overflow_popper' + this._uid
      this.$nextTick(() => {
        const popper = document.getElementsByClassName(this.tipClass)[0]
        if (popper) {
          popper.onmouseenter = () => {
            this.keepState = true
          }
          popper.onmouseleave = () => {
            this.keepState = false
            this.debounceHideTooltip()
          }
        }
      })
      if (textDiv && textDiv.scrollWidth > textDiv.clientWidth) {
        this.ellipsis = true
      } else {
        this.ellipsis = false
      }
    },
    debounceHideTooltip() {
      this.hideTooltipFun()
    },
    clampChange(clamped) {
      this.labelClamped = clamped
    }
  }
}
</script>

<style lang="scss">
.e-ellipsis {
  .tip-overflow {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
}
</style>
