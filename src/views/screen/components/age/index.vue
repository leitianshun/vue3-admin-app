<script setup lang='ts'>
import * as echarts from 'echarts'

const chart = ref()
const option = ref(
  // title: {
  //   text: '男女比例',
  //   textStyle: {
  //     color: 'skyblue',
  //   },
  //   left: '40%',
  // },

  {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 25,
      right: '16%',
      orient: 'vetical', // 图例组件布局朝向，为垂直方向
      textStyle: {
        color: 'white',
        fontSize: 15,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        // emphasis: {  //放大
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold',
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '10岁以下 16%' },
          { value: 735, name: '21' },
          { value: 580, name: '35' },
          { value: 484, name: '41' },
          { value: 300, name: '36' },
        ],
      },
    ],
    grid: { // 调整位置，与盒子的宽高一致
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
        年龄比例
      </div>
      <img src="../../images/dataScreen-title.png" class="w-20 mt-2" alt="">
    </div>
    <div ref="chart" class="w-full h-50 mt-5 " />
  </div>
</template>

<style scoped lang='scss'>
.box2 {
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .man {
    background: url('../../images/man-bg.png') no-repeat;
    background-size: 100% 100%;
  }

  .woman {
    background: url('../../images/woman-bg.png') no-repeat;
    background-size: 100% 100%
  }
}
</style>
