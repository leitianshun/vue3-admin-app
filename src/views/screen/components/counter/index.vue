<script setup lang="ts">
import * as echarts from 'echarts'

const chart = ref()
const option = ref({
  title: {
    // text: 'Basic Radar Chart',
  },
  legend: {
    // data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '去哪旅行', max: 6500 },
      { name: '携程', max: 16000 },
      { name: '高德', max: 30000 },
      { name: '百度', max: 38000 },
      { name: '滴滴', max: 52000 },
      { name: '曹操', max: 25000 },
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          // name: 'Allocated Budget',
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          // name: 'Actual Spending',
        },
      ],
      label: {
        show: true,
      },
    },
  ],
  grid: {
    // 调整位置，与盒子的宽高一致
    left: 0,
    // top: 120,
    right: 0,
    bottom: 10,
  },
})
onMounted(() => {
  const myChart = echarts.init(chart.value)
  myChart.setOption(option.value)
})
</script>

<template>
  <div class="box2 w-full h-full">
    <div class="text-xl ml-3 text-white">
      <div>预约渠道数据统计</div>
      <img src="../../images/dataScreen-title.png" class="w-20 mt-2" alt="" />
    </div>
    <div ref="chart" class="w-full h-60 mt-5" />
  </div>
</template>

<style scoped lang="scss">
.box2 {
  background: url('../../images/dataScreen-main-rc.png') no-repeat;
  background-size: 100% 100%;

  .man {
    background: url('../../images/man-rb.png') no-repeat;
    background-size: 100% 100%;
  }

  .woman {
    background: url('../../images/woman-bg.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
