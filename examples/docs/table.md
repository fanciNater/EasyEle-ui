<!--
 * @Author: your name
 * @Date: 2020-11-20 12:07:42
 * @LastEditTime: 2020-11-20 12:10:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/docs/table.md
-->
# Table 表格

<!-- {.md} -->

---

<!-- {.md} -->

## 如何使用

<!-- {.md} -->

方式一：<!-- {.md} --> 通过<!-- {.md} -->`e-table`标签来引用

<template>
    <table-demo
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @sortEnd="dragEnd($event)"
      @table-row-click="showRowClick"
      :colConfigs="colConfigs"
      :tableData="tableData"
      :summary-method="getSummaries"
      :sum-text="''"
      :rowDraggable="true"
      :rowKey="'date'"
      :seqType="'checkbox'"
      :border="true"
      :pagination="pagination"
      :show-summary="true"
      style="width: 100%">
    </table-demo>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          colConfigs: [{
            prop: "date",
            label: "日期",
            width: "880",
          }, {
            prop: "name",
            label: "姓名",
            width: "880",
            customSlot: 'tag',
            preventEvent: true
          }, {
            prop: "address",
            label: "地址",
            showOverflowTooltip: true
          },{
            prop: "date1",
            label: "日期",
            width: "180"
          }, {
            prop: "name2",
            label: "姓名",
            width: "180",
            customSlot: 'tag',
            preventEvent: true
          }, {
            prop: "address2",
            label: "地址",
            showOverflowTooltip: true
          }],
          pagination: {
            currentPage: 1,
            pageSize: 10,
            total: 100
          }
        }
      },
      methods: {
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = `<h1>N/A</h1>`;
            }
          });

          return sums;
        },
        dragEnd(event) {
          this.tableData = event.tableData;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        showRowClick(row, column, event) {
          console.log(row, column, event)
        }
      }
    }
  </script>

::: demo

```html
<template>
  <e-table
    @sortEnd="dragEnd($event)"
    :colConfigs="colConfigs"
    :tableData="tableData"
    :rowDraggable="true"
    :rowKey="'date'"
    :seqType="'checkbox'"
    :border="true"
    style="width: 100%"
  >
  </x-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        colConfigs: [
          {
            prop: 'date',
            label: '日期',
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180',
            customSlot: 'tag'
            preventEvent: true // 不响应rowClick事件
          },
          {
            prop: 'address',
            label: '地址',
            showOverflowTooltip: true
          }
        ]
      }
    },
    methods: {
      dragEnd(event) {
        this.tableData = event.tableData
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
| tableData | 表格数据 | Array | - | - |
| colConfigs | 列配置 | Array | - | 可以用 element-table-col 的全配置，增加`customSlot`自定义列配置, 增加`customHeaderSlot`自定义配置 |
| rowDraggable | 是否支持拖拽 | Boolean | - | false |
| rowKey | 行的唯一标识，会从 row 中取数据 | string | row 的 prop 名 |  |
| seqType | 索引列类型 | string | `checkbox`,`radio`,`seq`,`none` | `seq` , 给 row 设置`$index`属性，可以自定义序号列的显示值 |

## Event

<!-- {.md} -->

| 参数 | 说明 | 类型 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| dragEnd(\$event) | 拖拽完成之后的事件 |  | - | 需要执行`this.tableData = event.tableData`, 保证当前页面的`tableData`一致，后续考虑 sync 属性 |
| table-row-click(row, column, \$event) | 行点击事件 |  | - | 不能使用 table 自带的行点击事件，会触发多次 |

## Method

<!-- {.md} -->

| 参数            | 说明 | 类型               | 可选值 | 描述             |
| --------------- | ---- | ------------------ | ------ | ---------------- |
| getSelectData() |      | 获取当前选中的数据 | -      | 获取当前选中数据 |
