<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echarts'
import { IEchartXAxisLabel, IEchartValueData } from '../types'
const lineColor = '#2F5384'
const labelColor = '#74BFE7'
const fontSize = '18'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const echarts = require('echarts')
const props = defineProps<{
  labels: IEchartXAxisLabel[]
  values: IEchartValueData[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#176AFE'
        }
      }
    },
    legend: {
      show: true,
      x: 'center',
      y: '35',
      itemWidth: 45,
      itemHeight: 18,
      textStyle: {
        color: '#fff',
        fontSize: fontSize
      },
      data: ['分类销量统计']
    },
    grid: {
      left: '5%',
      right: '10%',
      top: '15%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          color: labelColor,
          fontSize: fontSize
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: lineColor,
            width: 2
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#195384'
          }
        },
        // boundaryGap: false,
        data: props.labels
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '(%)',
        nameTextStyle: {
          fontSize: fontSize,
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: labelColor,
            fontSize: fontSize
          }
        },
        axisLine: {
          lineStyle: {
            color: lineColor,
            width: 2
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#142B57'
          }
        }
      }
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        symbol: 'circle',
        symbolSize: 10,
        smooth: true,
        itemStyle: {
          normal: {
            color: 'rgba(3,240,254,1)',
            lineStyle: {
              color: 'rgba(3,240,254,1)',
              width: 2
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(3,240,254,.7)'
                },
                {
                  offset: 1,
                  color: 'rgba(3,240,254,0)'
                }
              ])
            },
            shadowColor: 'rgba(3,240,254,1)',
            shadowBlur: 20
          }
        },
        lineStyle: {
          normal: {
            color: '#176AFE'
          }
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: 'red'
            }
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
