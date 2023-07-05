<script setup lang='ts'>
const emits = defineEmits(['cancel'])
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
function cancel() {
  emits('cancel', 0)
}
</script>

<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入spu名称" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="value" placeholder="请选择品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="SPU图片">
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
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option label="1" />
          <el-option label="2" />
          <el-option label="3" />
        </el-select>
        <el-button type="primary" icon="Plus" class="ml-3">
          添加销售属性
        </el-button>
        <el-table border class="mt-5">
          <el-table-column label="序号" width="100px" type="index" align="center" />
          <el-table-column label="属性名" width="130px" align="center" />
          <el-table-column label="属性值" align="center" />
          <el-table-column label="操作" width="130px" align="center">
            <template #default="{ row, $index }">
              <el-button type="danger" icon="Delete" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">
          确定
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
</style>
