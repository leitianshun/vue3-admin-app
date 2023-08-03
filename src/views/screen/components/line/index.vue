<script setup lang="ts">
import * as echarts from 'echarts'

const line = ref()
onMounted(() => {
  const myChart = echarts.init(line.value)
  myChart.setOption({
    // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: '访问量',
      textStyle: {
        // color: 'white',
        fontStyle: 15,
      },
      bottom: 248,
      left: 13,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      // data: ['Line 1'], //中间标题
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      top: 80,
      left: '6%',
      right: '4%',
      bottom: '32%',
      // containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false, // 两则不留白，占满
        data: ['7/5', '7/7', '7/9', '7/11', '7/13', '7/15', '7/17'],
        splitLine: {
          // 关闭分割线
          show: false,
        },
        axisTick: {
          // 刻度
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          // 显示轴线
          show: true,
        },
        axisTick: {
          // 刻度
          show: true,
        },
      },
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true, // 平滑曲线
        lineStyle: {
          // width: 1,
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 25, 152)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
    ],
  })
})
</script>

<template>
  <div class="w-full line">
    <div class="text-white">
      <div>未来30天游客量趋势图</div>
      <img src="../../images/dataScreen-title.png" class="w-20 mt-2" alt="" />
    </div>
    <div ref="line" class="w-full h-80"></div>
  </div>
</template>

<style scoped lang="scss">
.line {
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
}
</style>
