<template>
  <div ref="tagGroupContainer" class="e-tag-group">
    <div ref="fixedSvgContainer" class="fixed-svg"></div>
    <div
      v-for="(tag, index) of renderTags"
      :key="tag.id"
      class="tag-info"
      :style="{ margin: `0 ${tagMarginWidth}px` }"
    >
      <slot name="tag" :tag="tag" :index="index"></slot>
    </div>
    <template v-if="tags.length > showCount">
      <el-tooltip
        effect="dark"
        :content="tags.map((item) => item[calcKey]).join('，')"
        placement="top"
      >
        <div class="tag-more">
          <x-svg-icon name="e-lib-more-tag"></x-svg-icon>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>
<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'XTagGroup',
  props: {
    calcKey: {
      type: String,
      default: 'label'
    },
    tags: {
      type: Array,
      default: () => {
        return []
      }
    },
    tagMaxWidth: {
      type: Number,
      default: 0
    },
    maxShowTag: {
      type: Number,
      default: 0
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    tagPaddingWidth: {
      type: Number,
      default: 12
    },
    tagMarginWidth: {
      type: Number,
      default: 4
    },
    tagFontSize: {
      type: Number,
      default: 12
    },
    countWidth: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      calcLimit: 5,
      // countWidth: 40,
      showCount: 0,
      maxWith: 0,
      erd: {}
    }
  },
  computed: {
    renderTags() {
      return this.tags.slice(0, this.showCount)
    }
  },
  watch: {
    tags: {
      handler(newValue, oldValue) {
        this.calcRenderCount()
      }
    }
  },
  created() {
    // 添加resize事件\
    this.erd = elementResizeDetectorMaker()
  },
  mounted() {
    // 添加mounted，动态获取组件宽度

    this.calcRenderCount()

    this.erd.listenTo(this.$refs.tagGroupContainer, this.calcRenderCount)
  },
  beforeDestroy() {
    this.erd.removeListener(this.$refs.tagGroupContainer, this.calcRenderCount)
  },
  methods: {
    calcRenderCount(element) {
      this.$nextTick(() => {
        if (!this.$refs.tagGroupContainer) {
          return
        }
        if (this.containerWidth === 0) {
          this.maxWidth = this.$refs.tagGroupContainer.clientWidth
        } else {
          this.maxWidth = this.containerWidth
        }
        this.calcTagCount()
      })
    },
    calcTagCount() {
      let tagWidths = []
      let renderCount = 0
      const calcCount = Math.floor(this.tags.length / this.calcLimit) + 1
      for (let index = 0; index < calcCount; index++) {
        const tagTexts = this.tags
          .slice(this.calcLimit * index, this.calcLimit * index + this.calcLimit)
          .map((tag) => {
            return tag[this.calcKey]
          })
        tagWidths = [...tagWidths, ...this.getSvgsWidth(tagTexts)]
        renderCount = this.compareCountWithMaxWidth(tagWidths, this.maxWidth)
        if (
          renderCount < tagWidths.length ||
          (renderCount === tagWidths.length && index === calcCount - 1)
        ) {
          this.showCount = renderCount === 0 ? 1 : renderCount
          return
        }
      }
    },
    getSvgsWidth(texts) {
      // 这里使用div不用fragment主要是不方便删除
      const textsFragment = document.createElement('div')
      const textElements = texts.map((text) => {
        const textElement = document.createElement('span')
        textElement.textContent = text
        textElement.style.fontSize = this.tagFontSize
        textsFragment.appendChild(textElement)
        return textElement
      })
      this.$refs.fixedSvgContainer.appendChild(textsFragment)
      const textElementsWidth = textElements.map((element) => element.getBoundingClientRect().width)
      this.$refs.fixedSvgContainer.removeChild(textsFragment)
      return textElementsWidth
    },
    compareCountWithMaxWidth(widths, maxWidth) {
      let count = 0
      for (let index = 0; index < widths.length; index++) {
        count = count + widths[index] + this.tagMarginWidth * 2 + this.tagPaddingWidth * 2

        if (count >= maxWidth - this.countWidth) {
          return index
        }
      }
      return widths.length
    }
  }
}
</script>

<style lang="scss">
.e-tag-group {
  width: 100%;
  flex: 1;
  display: flex;

  > .tag-info {
    display: flex;
    align-items: center;
    max-width: 100%; // 2020-08-24 11:51:52
  }

  .fixed-svg {
    position: fixed;
    width: 3000px;
    height: 3000px;
    left: -3000px;
    top: -3000px;
    visibility: hidden;
    // opacity: 0.5;
    // top: 0;
    // left: 0;
    // background: #FF0000;
  }
}
</style>
