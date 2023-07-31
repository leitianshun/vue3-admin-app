<script setup lang='ts'>
import Top from './components/top/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Youke from './components/youke/index.vue'

const screen = ref()
onMounted(() => {
  // const box: any = document.querySelector('.screen-box')
  // box.style.transform = `scale(${getScale()})`
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
function getScale(w = 1920, h = 1080) {
  const scaleWidth = window.innerWidth / w
  const scaleHeight = window.innerHeight / h
  return scaleWidth < scaleHeight ? scaleWidth : scaleHeight
}
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<template>
  <div class="box w-screen h-screen">
    <div ref="screen" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 screen-box  -translate-y-1/2 w-[1920px] h-[1080px] ">
      <div class="w-full h-10 ">
        <Top />
      </div>
      <div class="flex ">
        <div class="flex-1 h-[1040px] mt-3 flex flex-col justify-around">
          <Youke class="flex-[1.2] " />
          <Sex class="flex-1 border bg-green-200" />
          <Age class="flex-1  border bg-yellow-500" />
        </div>
        <div class="flex-[2] bg-green-300 mt-11">
          中
        </div>
        <div class="flex-1 bg-pink-500">
          右
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.box {
  background: url('/src/views/screen/images/bg.png') no-repeat;
  background-size: cover;
  .screen-box{
    transform-origin: left top;  //设置起点，这里就是根据原有位置进行移动，而不是根据屏幕现有位置移动
  }
}
</style>
