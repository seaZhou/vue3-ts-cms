<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light"
        ><i class="el-icon-warning-outline"></i
      ></el-tooltip>
    </div>
    <div class="content">
      <hp-counter-up
        :number="panelData.number1"
        :options="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      ></hp-counter-up>
    </div>
    <div class="footer">
      <span>
        {{ panelData.subtitle }}（件）：
        <hp-counter-up
          class="footer-"
          :number="panelData.number2"
          :option="
            panelData.amount === 'saleroom' ? counterOption2 : counterOption1
          "
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HpCounterUp from '@/base-ui/count-up'
export default defineComponent({
  name: 'statistical-panel',
  components: { HpCounterUp },
  props: {
    panelData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup(props, { emit }) {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }
    return {
      counterOption1,
      counterOption2
    }
  }
})
</script>
<style lang="less" scoped>
@ftc: #333;
.statistical-panel {
  color: @ftc;
  text-align: left;
  padding: 25px 52px 30px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(209, 217, 227, 0.25);
  border-radius: 16px;
  .header {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 40px;
    font-weight: bold;
    color: #176afe;
    letter-spacing: 1px;
    padding: 8px 0 46px;
  }
  .footer {
    font-size: 18px;
    .footer- {
      color: #176afe;
    }
  }
}
</style>
