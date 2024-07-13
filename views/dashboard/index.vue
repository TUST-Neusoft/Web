<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always" height="600px">
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <el-image :src="item.img" alt="Banner Image" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
    <h2 style="width: 100%;text-align: center;margin-top: 50px;">推荐信息</h2>
    <el-row :gutter="20" style="padding: 0 15vw;">
      <el-col :span="16">
        <el-image
          style="width: 100%; height: 100%"
          :src="require('@/assets/cc1.png')"
          fit="cover"
        />
      </el-col>
      <el-col :span="8">
        <el-image
          style="width: 100%; height: 100%"
          :src="require('@/assets/cc2.png')"
          fit="cover"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 0 15vw;">
      <el-col :span="8">
        <el-image
          style="width: 100%; height: 100%"
          :src="require('@/assets/cc3.png')"
          fit="cover"
        />
      </el-col>
      <el-col :span="16">
        <el-image
          style="width: 100%; height: 100%"
          :src="require('@/assets/cc4.png')"
          fit="cover"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: require('@/assets/banner1.png')
        },
        {
          img: require('@/assets/banner2.png')
        },
        {
          img: require('@/assets/banner3.png')
        },
        {
          img: require('@/assets/banner4.png')
        },
        {
          img: require('@/assets/banner5.png')
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: auto;
}
</style>
