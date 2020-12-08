<!--
 * @Author: fanciNate
 * @Date: 2020-11-20 11:35:47
 * @LastEditTime: 2020-11-20 12:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-table/src/main.vue
-->
<template>
  <div ref="eBlockTableDiv" class="e-table" @mousedown="onmousedown">
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :data="orderTableData"
      :row-key="rowKey"
      :row-class-name="tableRowClassName"
      v-on="$listeners"
      @row-click="handleRowClick"
    >
      <el-table-column
        v-if="seqType !== 'none'"
        v-bind="seqConfig"
        align="center"
        :width="seqFitWidth ? realSeqWidth : seqWidth"
      >
        <template v-if="seqType !== 'none'" v-slot="{ row, column, $index }">
          <span
            :ref="row[rowKey]"
            class="seq"
            :class="seqType === 'checkbox' || seqType === 'radio' ? 'seq-checkable' : ''"
          >
            {{ seqRender(row, column, $index) }}
          </span>
          <span v-if="seqType === 'checkbox' && !row.disableChecked" class="checkbox seq-checkbox">
            <el-checkbox
              :value="row.selected"
              tab-index="-1"
              @click.native="rowSelected(row, $event, !row.selected)"
            ></el-checkbox>
          </span>
          <span v-if="seqType === 'radio' && !row.disableChecked" class="radio seq-radio">
            <el-radio
              :value="!!row.selected"
              :label="true"
              :name="row[rowKey]"
              tab-index="-1"
              @click.native="rowSelected(row, $event)"
            ></el-radio>
          </span>
          <span class="sql-cell-sign">
            <slot name="sqlSign" :row="row"></slot>
          </span>
        </template>
        <template v-slot:header="">
          <el-checkbox
            v-if="seqType === 'checkbox'"
            :indeterminate="allSelected() === 'indeterminate'"
            :value="allSelected() === 'all'"
            tab-index="-1"
            @click.native="allRowSelected($event)"
          ></el-checkbox>
          <x-svg-icon v-else name="num-icon" :width="20" :height="20"></x-svg-icon>
        </template>
        <template v-slot:footer="">
          <slot name="seqFooter"></slot>
        </template>
      </el-table-column>
      <template v-for="(colConfig, colIndex) in colConfigs">
        <el-table-column
          v-if="colConfig.customSlot"
          :key="colConfig.prop"
          v-bind="colConfig"
          :min-width="colConfig.minWidth || minWidth"
          :width="colConfig.width"
          :column-key="colConfig.prop"
        >
          <template v-slot="{ row, column, $index }">
            <slot
              :name="colConfig.customSlot"
              :row="row"
              :index="$index"
              :column="column"
              :colIndex="colIndex"
            ></slot>
          </template>
          <template v-if="colConfig.customHeadSlot" v-slot:header="{ column }">
            <slot :name="colConfig.customHeadSlot" :column="column" :colIndex="colIndex"></slot>
          </template>

          <template v-else v-slot:header="{ column }">
            <e-ellipsis :label="column.label" mode="origin" />
          </template>

          <!-- <template v-if="colConfig.customFootSlot" v-slot:footer="{ column }">
            <slot :name="colConfig.customFootSlot" :column="column" :colIndex="colIndex"></slot>
          </template> -->
        </el-table-column>
        <el-table-column
          v-else
          :key="colConfig.prop"
          :min-width="colConfig.minWidth || minWidth"
          :width="colConfig.width"
          v-bind="colConfig"
          :show-overflow-tooltip="false"
          :column-key="colConfig.prop"
        >
          <!-- lizhihang 表格不使用自带的 show-overflow-tooltip 属性，如果配置了showOverflowTooltip，则使用e-ellipsis组件显示 -->
          <template v-if="colConfig.showOverflowTooltip === true" v-slot="{ row, column, $index }">
            <e-ellipsis :label="row[colConfig.prop]" mode="origin" />
          </template>
          <template v-if="colConfig.customHeadSlot" v-slot:header="{ column }">
            <slot :name="colConfig.customHeadSlot" :column="column" :colIndex="colIndex"></slot>
          </template>

          <template v-else v-slot:header="{ column }">
            <e-ellipsis :label="column.label" mode="origin" />
          </template>

          <!-- <template v-if="colConfig.customFootSlot" v-slot:footer="{ column }">
            <slot :name="colConfig.customFootSlot" :column="column" :colIndex="colIndex"></slot>
          </template> -->
        </el-table-column>
      </template>
      <template v-slot:empty>
        <!-- 空页面 -->
        <slot name="empty"></slot>
      </template>
    </el-table>
    <el-pagination
      v-if="!pageConfig.hidden"
      ref="elPagination"
      background
      class="pagination"
      popper-class="pagination-popper"
      :hide-on-single-page="pageConfig.hideOnSinglePage"
      :page-sizes="pageConfig.pageSizeChanger"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :layout="layout"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import XSvgIcon from '../../e-svg-icon/index'
import UUIDUtil from '../../../utils/uuid.util'

export default {
  name: 'ETable',
  components: {
    XSvgIcon
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    colConfigs: {
      type: Array,
      required: true
    },
    seqConfig: {
      type: Object,
      required: false
    },
    seqType: {
      type: String,
      validator: function(value) {
        return ['radio', 'checkbox', 'seq', 'none'].includes(value)
      },
      default: function() {
        return 'seq'
      }
    },
    rowKey: {
      type: String,
      default: '$__seq_ID'
    },
    rowDraggable: {
      type: Boolean,
      default: false
    },
    columnDraggable: {
      type: Boolean,
      default: false
    },
    pageConfig: {
      type: Object,
      default: function() {
        return {
          hidden: false,
          pageSizeChanger: [10, 20, 30, 40]
        }
      }
    },
    pagination: {
      type: Object,
      default: function() {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    layout: {
      type: String,
      default: function() {
        return 'prev, pager, next, sizes, total'
      }
    },
    seqWidth: {
      type: Number,
      default: function() {
        return 44
      }
    },
    // 表格序号列是否自适应宽度
    seqFitWidth: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    // 锁定分页tabindexan
    lockPaginationTabindex: {
      type: Boolean,
      default: false
    },
    needDrop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderTableData: [],
      orderColumns: [],
      selectData: [],
      minWidth: 120,
      rowSortable: undefined,
      columnSortable: undefined,
      debounceEmitRowClick: this.$lodash.debounce(this.emitRowClick, 5, { maxWait: 10 }),
      realSeqWidth: this.seqWidth
    }
  },
  computed: {},
  watch: {
    /**
     * TODO: 可优化，tableData理论上不应该进行过多的Watch，如果是针对特殊场景，需要抽离出去
     */
    tableData: {
      handler: function(val, oldVal) {
        if (val === this.orderTableData) {
          return
        }
        if (val && Array.isArray(val)) {
          val.forEach((item, index) => {
            item['$__seq_ID'] = item['$__seq_ID'] || `__seq_ID_${UUIDUtil.guid()}`
          })
          if (this.needDrop) {
            this.$nextTick(() => {
              this.rowDrop()
              this.columnDrop()
            })
          }
        }
        this.selectData = (val || []).filter((item) => {
          return item.selected
        })
        this.$emit('selectDataChange', this.getSelectData())
        this.orderTableData = val || []
        this.computeTableSeqWidth()
        if (val.length !== 0) {
          this.$nextTick(() => {
            if (this.$refs.elTable) {
              this.$refs.elTable.doLayout()
            }
          })
        }
      },
      immediate: true
    },
    colConfigs: {
      handler: function(val, oldVal) {
        if (val === this.orderColumns) {
          return
        }
        if (val && Array.isArray(val)) {
          const elTableColumns = (this.$refs.elTable && this.$refs.elTable.columns) || []
          val.forEach((item, index) => {
            item['id'] = item['id'] || `__seq_ID_${UUIDUtil.guid()}`
            if (elTableColumns && elTableColumns.length > 0) {
              if (elTableColumns[index]) {
                elTableColumns[index].id = item.id
                elTableColumns[index].label = item.label
                elTableColumns[index].property = item.prop
              }
            }
          })
        }
        this.$nextTick(() => {
          this.columnDrop()
        })
        this.orderColumns = val || []
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$refs.elTable) {
      this.computeTableSeqWidth()
      if (this.$refs.elTable.$el.children[2]) {
        this.$refs.elTable.$el.children[2].addEventListener('scroll', this.onscroll, false)
      }
    }

    if (this.$refs.elTable) {
      const tableHeaderWrapper = this.$refs.elTable.$el.querySelector('.el-table__header-wrapper')
      const tableFooterWrapper = this.$refs.elTable.$el.querySelector('.el-table__footer-wrapper')

      if (tableHeaderWrapper) {
        tableHeaderWrapper.addEventListener('mousewheel', this.onmousewheel, false)
      }

      if (tableFooterWrapper) {
        tableFooterWrapper.addEventListener('mousewheel', this.onmousewheel, false)
      }
    }
    this.$nextTick(() => {
      // 使selectPager的tabindex修改成功
      if (
        this.$refs.elPagination &&
        this.$refs.elPagination.$el &&
        this.$refs.elPagination.$el.querySelector &&
        this.lockPaginationTabindex
      ) {
        const buttonPrev = this.$refs.elPagination.$el.querySelector('.btn-prev')
        const buttonNext = this.$refs.elPagination.$el.querySelector('.btn-next')
        const selectPager = this.$refs.elPagination.$el.querySelector(
          '.el-pagination__sizes .el-input__inner'
        )
        if (buttonPrev) {
          buttonPrev.tabIndex = '-1'
        }
        if (buttonNext) {
          buttonNext.tabIndex = '-1'
        }
        if (selectPager) {
          selectPager.tabIndex = '-1'
        }
      }
    })
  },
  beforeDestroy() {
    this.columnSortable && this.columnSortable.destroy()
    if (this.$refs.elTable && this.$refs.elTable.$el.children[2]) {
      this.$refs.elTable.$el.children[2].removeEventListener('scroll', this.onscroll, false)
    }

    if (this.$refs.elTable) {
      const tableHeaderWrapper = this.$refs.elTable.$el.querySelector('.el-table__header-wrapper')
      const tableFooterWrapper = this.$refs.elTable.$el.querySelector('.el-table__footer-wrapper')

      if (tableHeaderWrapper) {
        tableHeaderWrapper.removeEventListener('mousewheel', this.onmousewheel, false)
      }

      if (tableFooterWrapper) {
        tableFooterWrapper.removeEventListener('mousewheel', this.onmousewheel, false)
      }
    }
  },
  methods: {
    allSelected: function() {
      const orderSelectData = this.orderTableData.filter((row) => row.selected)
      if (this.orderTableData.length === orderSelectData.length && orderSelectData.length > 0) {
        return 'all'
      } else if (orderSelectData.length > 0) {
        return 'indeterminate'
      } else {
        return 'none'
      }
    },
    onscroll(event) {
      if (event && event.srcElement.classList.contains('el-table__body-wrapper')) {
        event.path[event.path.length - 3].click()
      }
    },
    onmousewheel(event) {
      event.stopPropagation()
      event.preventDefault()
    },
    onmousedown(event) {
      if (event && event.srcElement.classList.contains('el-table__body-wrapper')) {
        event.path[event.path.length - 3].click()
      }
    },
    // 行拖拽
    rowDrop() {
      const tbody = this.$refs.eBlockTableDiv.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      this.rowSortable = Sortable.create(tbody, {
        disabled: !_this.rowDraggable,
        animation: 300,
        delay: 3,
        onEnd(evt) {
          const oldItem = _this.orderTableData[evt.oldIndex]
          const tableData = this.$lodash
            ? this.$lodash.cloneDeep(_this.orderTableData)
            : JSON.parse(JSON.stringify(_this.orderTableData))
          tableData.splice(evt.oldIndex, 1)
          tableData.splice(evt.newIndex, 0, oldItem)
          _this.orderTableData = tableData
          _this.$emit('sortEnd', {
            oldIndex: evt.oldIndex,
            newIndex: evt.newIndex,
            tableData: _this.orderTableData
          })
        }
      })
    },
    // 列拖拽
    columnDrop() {
      if (this.$refs.eBlockTableDiv && this.columnDraggable) {
        this.columnSortable && this.columnSortable.destroy()

        const wrapperTr = this.$refs.eBlockTableDiv.querySelector('.el-table__header-wrapper tr')
        const _this = this
        this.columnSortable = Sortable.create(wrapperTr, {
          disabled: !_this.columnDraggable,
          animation: 300,
          delay: 3,
          onEnd: (evt) => {
            const oldItem = _this.orderColumns[evt.oldIndex]
            const colConfigs = _this.$lodash
              ? _this.$lodash.cloneDeep(_this.orderColumns)
              : JSON.parse(JSON.stringify(_this.orderColumns))
            colConfigs.splice(evt.oldIndex, 1)
            colConfigs.splice(evt.newIndex, 0, oldItem)
            // colConfigs.forEach((val, index) => {
            //   val.width = _this.colConfigs[index].width
            // })
            _this.orderColumns = colConfigs
            _this.$emit('sortColumnsEnd', {
              oldIndex: evt.oldIndex,
              newIndex: evt.newIndex,
              colConfigs: _this.orderColumns
            })
          }
        })
      }
    },
    /**
     * TODO: 可优化，不需要动态计算class-name
     */
    tableRowClassName({ row, rowIndex }) {
      const checked = this.selectData.some((item) => {
        return item[this.rowKey] === row[this.rowKey]
      })
      return checked ? 'row-checked' : ''
    },
    rowSelected(row, $event, selected, immediate = true) {
      if (this.seqType === 'checkbox') {
        row.selected = selected
        const selectRowIndex = this.selectData.findIndex(
          (item) => item[this.rowKey] === row[this.rowKey]
        )
        if (row.selected && selectRowIndex === -1) {
          this.selectData.push(row)
        } else if (!row.selected && selectRowIndex !== -1) {
          this.selectData.splice(selectRowIndex, 1)
        }
      } else if (this.seqType === 'radio') {
        this.selectData.forEach((item) => (item.selected = false))
        const selectRowIndex = this.selectData.findIndex(
          (item) => item[this.rowKey] === row[this.rowKey]
        )
        if (selectRowIndex === -1) {
          row.selected = true
          this.selectData = [row]
        } else {
          this.selectData = []
        }
      }
      if (immediate) {
        this.orderTableData = [...this.orderTableData]
        this.$emit('selectDataChange', this.getSelectData())

        if ($event) {
          $event.stopPropagation()
          $event.preventDefault()
        }
      }
    },
    allRowSelected($event) {
      if (this.allSelected() === 'none' || this.allSelected() === 'indeterminate') {
        this.orderTableData.forEach((item) => {
          this.rowSelected(item, $event, true, false)
        })
      } else {
        this.orderTableData.forEach((item) => {
          this.rowSelected(item, $event, false, false)
        })
      }

      if ($event) {
        $event.stopPropagation()
        $event.preventDefault()
      }

      this.orderTableData = [...this.orderTableData]
      this.$emit('selectDataChange', this.getSelectData())
    },
    clearSelected() {
      this.selectData.forEach((item) => (item.selected = false))
      this.selectData = []
      this.orderTableData = [...this.orderTableData]
      this.$emit('selectDataChange', this.getSelectData())
    },
    getSelectData() {
      return this.selectData
    },
    emitRowClick(row, column, event) {
      this.$emit('table-row-click', row, column, event)
    },
    handleRowClick(row, column, event) {
      if (!this.$lodash) {
        throw new Error('请安装lodash插件')
      }

      if (!column) {
        return
      }

      if (!column.property && (this.seqType === 'checkbox' || this.seqType === 'radio')) {
        return
      }

      const colConfig = this.colConfigs.find((col) => {
        return col.prop === column.property
      })

      if (colConfig.preventEvent) {
        return
      }

      this.debounceEmitRowClick(row, column, event)
    },
    handleSizeChange(val) {
      this.$emit('size-change', val)
      this.computeTableSeqWidth()
    },
    handleCurrentChange(val) {
      this.$emit('current-page-change', val)
      this.computeTableSeqWidth()
    },
    /**
     * TODO: 可优化，此处可以直接计算所有值，并不需要每次都计算
     */
    seqRender(row, column, $index) {
      if (this.pagination && this.pagination.currentPage && this.pagination.pageSize) {
        return (
          row[$index] || (this.pagination.currentPage - 1) * this.pagination.pageSize + $index + 1
        )
      } else {
        return row[$index] || $index + 1
      }
    },
    /**
     * TODO: 可优化，此问题可能会重复运行
     */
    computeTableSeqWidth() {
      // 表格数据更新后重新计算表格里数据最后一条序号span的宽度
      if (this.seqType !== 'none' && this.seqFitWidth) {
        this.$nextTick(() => {
          try {
            if (this.orderTableData && this.orderTableData.length > 0) {
              // const element = document.getElementById(
              //   this.orderTableData[this.orderTableData.length - 1][this.rowKey]
              // )
              // eslint-disable-next-line standard/computed-property-even-spacing
              const element = this.$refs[
                this.orderTableData[this.orderTableData.length - 1][this.rowKey]
              ]
              if (element && element.offsetWidth !== 0) {
                const seqSpanWidth = element.offsetWidth + 32 + 4
                this.realSeqWidth = seqSpanWidth > this.seqWidth ? seqSpanWidth : this.seqWidth
              }
            }
          } catch (error) {
            console.error(error)
          }
        })
      }
    }
  }
}
</script>
