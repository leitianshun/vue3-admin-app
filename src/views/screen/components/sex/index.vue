<script setup lang='ts'>
import * as echarts from 'echarts'

const chart = ref()
const option = ref({
  title: {
    text: '男女比例',
    textStyle: {
      color: 'skyblue',
    },
    left: '40%',
  },
  xAxis: {
    show: false,
    min: 0,
    max: 100,
  },
  yAxis: {
    show: false,
    type: 'category',
  },
  series: [
    {
      data: [58],
      type: 'bar',
      barWidth: 20,
      z: 100, // 调整层级
      itemStyle: {
        borderRadius: 50,
      },
    },
    {
      data: [100],
      type: 'bar',
      barWidth: 20, // 柱子的宽度
      barGap: '-100%', // 调整柱状图的位置
      itemStyle: {
        color: 'pink',
        borderRadius: 50,
      },
    },
  ],
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
})
onMounted(() => {
  const myChart = echarts.init(chart.value)
  myChart.setOption(option.value)
})
</script>

<template>
  <div class="box2">
    <div class="ml-5 text-xl text-white">
      <div>
        男女比例
      </div>
      <img src="../../images/dataScreen-title.png" class="w-20 mt-2" alt="">
    </div>
    <div class="flex justify-evenly mt-8">
      <div class="w-25 h-25 man text-center text-white">
        <p>男士</p>
        <img src="../../images/man.png" class="mt-2" alt="">
      </div>
      <div class="w-25 h-25 woman text-center text-white">
        <p>女士</p>
        <img src="../../images/woman.png" class="mt-2" alt="">
      </div>
    </div>
    <div class="flex justify-evenly mt-3 text-white">
      <div>男士56%</div>
      <div>女士44%</div>
    </div>
    <div ref="chart" class="w-full h-20 mt-5 " />
  </div>
</template>

<style scoped lang='scss'>
.box2 {
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
.man{
  background: url('../../images/man-bg.png') no-repeat;background-size: 100% 100%;
}
.woman{
background: url('../../images/woman-bg.png') no-repeat;background-size: 100% 100%

}
}
</style>
