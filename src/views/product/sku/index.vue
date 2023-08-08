<script setup lang="ts">
import type {
  skuDataResType,
  skuDataType,
  skuInfoObjType,
} from '@/api/product/sku/type'

const skuData = ref<skuInfoObjType[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const drawerVisible = ref<boolean>(false) // 控制抽屉的开关

const skuDetailObj = ref<skuDataType>({}) // sku详情数据,这里也可以将类型全部定义为可选的，这样就不用全部显示

async function getSkuData(page = 1) {
  // 获取sku分页数据,切换页数的时候自动注入getSkuData(page)，可直接写在分页的dom中
  currentPage.value = page
  const res = await getSkuList(currentPage.value, pageSize.value)
  if (res.code === 200) skuData.value = res.data.records
  total.value = res.data.total
  console.log(res)
}
onMounted(() => {
  getSkuData()
})
async function deleteSku(skuId: number) {
  // 删除sku
  const res = await delSku(skuId)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSkuData(
      skuData.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error(res.data!)
  }
}

async function handleView(skuId: number) {
  const res = await getSkuDetail(skuId)
  if (res.code === 200) {
    drawerVisible.value = true
    skuDetailObj.value = res.data
  }
}
function handleSizeChange() {
  // 切换每页数量回调 ，这里的参数已经双向绑定，只需要再次获取即可
  // pageSize.value = size
  getSkuData()
}

async function changeSaleStatus(row: skuDataResType) {
  // 产品上下架回调
  let isSuccess = false
  if (row.isSale === 0) {
    const res = await onSale(row.id as number) // 上架
    if (res.code === 200) isSuccess = true
  } else {
    const res = await cancelSale(row.id as number) // 下架
    if (res.code === 200) isSuccess = true
  }
  if (isSuccess) getSkuData()
  ElMessage({
    type: row.isSale === 0 ? 'success' : 'info',
    message: row.isSale === 0 ? '上架成功' : '下架成功',
  })
}
function handleEdit() {
  // 修改
  ElMessage.success('功能正在研发中')
}
</script>

<template>
  <div>
    <el-card class="">
      <el-table :data="skuData" border stripe height="calc(100vh - 210px)">
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column
          label="名称"
          prop="skuName"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="描述"
          show-overflow-tooltip
          prop="skuDesc"
          align="center"
        />
        <el-table-column label="默认图片" align="center" prop="skuDefaultImg">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" class="w-25 h-25" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" align="center" prop="weight" />
        <el-table-column label="价格(元)" align="center" prop="price" />
        <el-table-column label="操作" width="260" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              :type="row.isSale === 0 ? 'success' : 'warning'"
              :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
              v-has="`btn.Sku.updown`"
              @click="changeSaleStatus(row)"
            />
            <el-button
              type="primary"
              icon="Edit"
              v-has="`btn.Sku.update`"
              @click="handleEdit"
            />
            <el-button
              type="info"
              icon="InfoFilled"
              @click="handleView(row.id)"
              v-has="`btn.Sku.detail`"
            />
            <el-popconfirm
              :title="`是否确认删除${row.skuName}?`"
              v-has="`btn.Sku.remove`"
              @confirm="deleteSku(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        v-model="drawerVisible"
        size="35%"
        title="查看商品详情"
        direction="rtl"
      >
        <el-card>
          <el-row :gutter="10" justify="space-around" align="middle">
            <el-col :span="6">名称:</el-col>
            <el-col :span="18">
              {{ skuDetailObj.skuName }}
            </el-col>
          </el-row>
          <el-row
            :gutter="10"
            justify="space-around"
            class="mt-3"
            align="middle"
          >
            <el-col :span="6">描述:</el-col>
            <el-col :span="18">
              {{ skuDetailObj.skuDesc }}
            </el-col>
          </el-row>

          <el-row
            :gutter="10"
            justify="space-around"
            class="mt-3"
            align="middle"
          >
            <el-col :span="6">价格:</el-col>
            <el-col :span="18">
              {{ skuDetailObj.price }}
            </el-col>
          </el-row>

          <el-row
            :gutter="10"
            justify="space-around"
            class="mt-3"
            align="middle"
          >
            <el-col :span="6">平台属性:</el-col>
            <el-col :span="18">
              <el-button
                v-for="item in skuDetailObj.skuAttrValueList"
                :key="item.id"
                size="small"
                class="m-2"
                type="primary"
              >
                {{ item.valueName }}
              </el-button>
            </el-col>
          </el-row>

          <el-row
            :gutter="10"
            justify="space-around"
            class="mt-3"
            align="middle"
          >
            <el-col :span="6">销售属性:</el-col>
            <el-col :span="18">
              <el-button
                v-for="item in skuDetailObj.skuSaleAttrValueList"
                :key="item.id"
                size="small"
                class="m-2"
                type="success"
              >
                {{ item.saleAttrValueName }}
              </el-button>
            </el-col>
          </el-row>

          <el-row
            v-if="skuDetailObj.skuImageList!.length > 0"
            :gutter="10"
            class="mt-3"
          >
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <el-carousel
                :interval="3000"
                type="card"
                class="shadow"
                height="230px"
              >
                <el-carousel-item
                  v-for="item in skuDetailObj.skuImageList"
                  :key="item.id"
                >
                  <img :src="item.imgUrl" class="w-full h-full" alt="" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </el-card>
      </el-drawer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        class="my-5"
        :page-sizes="[10, 20, 50, 100]"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getSkuData"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
