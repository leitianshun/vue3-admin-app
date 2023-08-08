<script setup lang="ts">
import * as echarts from 'echarts'

import 'echarts-liquidfill'

// 水球图拓展插件
const chart = ref()
const option = ref({
  title: {
    text: '景区排行',
    left: '50%',
    top: 0,
    // link: 'http://www.baidu.com', // 标题跳转链接
    textStyle: {
      color: 'yellowgreen',
      fontSize: 20,
    },
    subtext: '各大景区排行',
    subtextStyle: {
      color: 'yellow',
      fontSize: 13,
    },
  },
  xAxis: {
    type: 'category', // 图形在x轴均匀分分布
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    // type: 'value',
    splitLine: false,
    axisLine: {
      // 显示轴线
      show: true,
    },
  },
  grid: {
    left: 30,
    bottom: 20,
  },
  series: [
    {
      data: [20, 30, 40, 50, 60, 70, 80],
      type: 'bar',
      // radius: '95%',
      // 展示数据在柱状图上，柱状图的文本标签
      label: {
        show: true,
        position: 'top', // 文字的位置
        color: 'pink', // 文字的颜色
      },
      // showbackground:true  //显示背景
      // backgroundStyle:{  //底部背景颜色
      //   color:'red'
      // }
      itemStyle: {
        borderRadius: 20, // 圆角
        // color: (data: any) => {
        //   // 颜色,函数写法，也可单独设置
        //   const arr = ['red']
        //   return arr[0]
        //   return arr[data.dataIndex]
        // },
      },
    },
    {
      type: 'line',
      data: [20, 30, 40, 50, 60, 70, 80],
      smooth: true, // 平滑曲线
    },
  ],
  tooltip: {}, // 提示框
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
        <div>热门景区排行</div>
        <img src="../../images/dataScreen-title.png" class="w-20 mt-5" alt="" />
      </div>
      <!-- <p class="mt-8 mr-10">
        可预约总量
        <span class="text-yellow-300">99999999</span>
        人
      </p> -->
    </div>
    <div ref="chart" class="w-full h-62" />
  </div>
</template>

<style scoped lang="scss">
.box2 {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  .number {
    span {
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      line-height: 48px;
      color: #29fcff;
    }
  }
}
</style>
