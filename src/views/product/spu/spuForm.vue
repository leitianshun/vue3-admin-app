<script setup lang='ts'>
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '小米',
  },
  {
    value: 'Option2',
    label: '华为',
  },
  {
    value: 'Option3',
    label: '苹果',
  },
]
function onSuccess() {}
function beforeUpload() {}
</script>

<template>
  <div>
    <el-form>
      <el-form-item label="spu名称">
        <el-input placeholder="请输入spu名称" />
      </el-form-item>
      <el-form-item label="spu品牌">
        <el-select v-model="value" placeholder="请选择品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else class="text-center">
            <el-icon><Plus /></el-icon>
            <div>
              点击上传图片
            </div>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
</style>
