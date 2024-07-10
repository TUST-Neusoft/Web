<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <el-image :src="item.img" alt="Banner Image" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
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
