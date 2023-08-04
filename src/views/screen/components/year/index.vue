<script setup lang="ts">
import * as echarts from 'echarts'

const chart = ref()
const option = ref({
  title: {
    text: '散点图',
    left: '50%',
    textStyle: {
      color: 'white',
    },
  },
  xAxis: {
    type: 'category', // 均匀分布
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
    },
  },
  series: [
    {
      type: 'scatter',
      data: [10, 20, 30, 60, 80],
      symbol: 'arrow',
      symbolSize: 20,
      label: {
        show: true,
        color: 'pink',
      },
      itemStyle: {
        color: 'cyan',
      },
    },
  ],
  grid: {
    // 调整位置，与盒子的宽高一致
    left: 30,
    top: 20,
    bottom: 30,
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
      <div>年度游客量对比</div>
      <img src="../../images/dataScreen-title.png" class="w-20 mt-2" alt="" />
    </div>
    <div ref="chart" class="w-full h-65 mt-5" />
  </div>
</template>

<style scoped lang="scss">
.box2 {
  background: url('../../images/dataScreen-main-rc.png') no-repeat;
  background-size: 100% 100%;

  .man {
    background: url('../../images/man-bg.png') no-repeat;
    background-size: 100% 100%;
  }

  .woman {
    background: url('../../images/woman-bg.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
