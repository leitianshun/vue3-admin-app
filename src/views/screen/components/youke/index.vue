<script setup lang='ts'>
import * as echarts from 'echarts'

import 'echarts-liquidfill'

// 水球图拓展插件
const count = ref('1234562人')
const chart = ref()
const option = ref({
  title: {
    text: '水球图',
  },
  // xAxis: {
  //   type: 'category',
  //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // },
  // yAxis: {
  //   type: 'value',
  // },
  series: [
    {
      data: [0.5, 0.4, 0.3],
      type: 'liquidFill',
      radius: '95%',
    },
  ],
})
onMounted(() => {
  const myChart = echarts.init(chart.value)
  myChart.setOption(option.value)
})
</script>

<template>
  <div class="box2">
    <div class="flex text-white justify-between">
      <div class="ml-5 text-xl">
        <div>
          实时游客统计
        </div>
        <img src="../../images/dataScreen-title.png" class="w-20 mt-5" alt="">
      </div>
      <p class="mt-8 mr-10 ">
        可预约总量
        <span class="text-yellow-300">
          99999999
        </span>
        人
      </p>
    </div>
    <div class="number mt-5  flex my-1">
      <span v-for="(item, index) in count" :key="index" class="flex-1 inline-block h-12 text-xl font-bold  text-center">{{ item }}</span>
    </div>
    <div ref="chart" class="w-full h-62 " />
  </div>
</template>

<style scoped lang='scss'>
.box2 {
  background:url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size:100% 100%;
  .number{
    span{
      background:url('../../images/total.png') no-repeat;
      background-size:100% 100%;
      line-height:48px;
    color: #29fcff;
    }
  }
}
</style>
