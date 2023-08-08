<script setup lang="ts">
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  // 禁用下一行规则,后面填写规格名称  //eslint-disable-next-line  vue/no-reserved-component-names
  // 禁用此行规则  // eslint-disable-line  no-eval
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
}
</script>

<template>
  <!-- 没有子路由的 -->
  <template v-for="item in menuList" :key="index">
    <!-- 没有子路由的 -->
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 有子路由且只有一个的，直接显示，不使用折叠 -->
    <el-menu-item
      v-if="item.children && item.children.length === 1 && !item.meta.hidden"
      :index="item.path"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon" />
      </el-icon>
      <template #title>
        <span>
          {{ item.children[0].meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 有子路由且子路由的个数大于1 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <!-- 递归组件，如果有子路由再次调用这个组件，会走没有子路由的逻辑判断，渲染el-menu-item 标签 -->
      <Menu :menu-list="item.children" />

      <!-- <el-menu-item v-for="item2 in item.children" :key="item2.path" :index="item2.path">
        <el-icon>
          <component :is="item2.meta.icon" />
        </el-icon>
        <template #title>
          {{ item2.meta.title }}
        </template>
      </el-menu-item> -->
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss"></style>
