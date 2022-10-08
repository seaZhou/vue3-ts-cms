<template>
  <div class="hp-table">
    <div class="header">
      <slot name="header">
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      style="--el-table-border-color: 'none'"
      :row-key="getRowKey"
      :header-cell-style="{
        color: '#000'
      }"
    >
      <el-table-column
        v-if="showSelectColumn"
        @selection-change="selectionChange"
        v-bind="childrenProps"
        :reserve-selection="true"
        type="selection"
        width="60"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="totalCount"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'hp-table',
  props: {
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    propList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    console.log('listData--->>', props.listData)
    const handleCurrentChange = (currentPage: number) => {
      console.log(props, 'props', currentPage)
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const selectionChange = (value: any) => {
      if (props.showSelectColumn) {
        emit('selectionChange', value)
      }
    }

    // 翻页勾选-记忆功能
    const getRowKey = (rowItem: any) => {
      return rowItem.id
    }
    return {
      handleCurrentChange,
      handleSizeChange,
      selectionChange,
      getRowKey
    }
  }
})
</script>
<style lang="less" scoped>
@br: 16px;
.hp-table {
  /deep/ .el-table {
    border-radius: @br;
    .el-table__header-wrapper {
      height: 70px;
      background: #fff;
      box-shadow: 0px 2px 16px 0px rgba(211, 222, 241, 0.5);
      border-radius: @br;
      padding: 0 26px;
      tr th {
        padding: 24px 0;
      }
    }
    .el-table__body-wrapper {
      padding: 20px 26px 24px;
      color: #000;
    }
  }
  .footer {
    text-align: right;
    padding: 0 26px 24px 0;
  }
}
</style>
