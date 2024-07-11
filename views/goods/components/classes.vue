<template>
    <div class="webpage">
      <el-card class="custom-card" shadow="hover">
        <div class="image-container">
          <el-image :src="require('@/assets/404_images/mengniu-logo.png')" :fit="fit" class="image-title" alt="Product Image" />
          <el-image :src="imageUrl" :fit="fit" class="image" alt="Product Image" />
        </div>
        <div class="content">
          <div class="price">{{ price }}</div>
          <h2 class="title">{{ title }}</h2>
          <p class="description">{{ description }}</p>
          <div class="sales">销量: {{ sales }}</div>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
      name: 'ProductPage',
      props: ['imageUrl', 'title', 'description', 'price','sales'],
      data() {
          return {
              fit: 'contain'
          };
      }
  };
  </script>
  
  <style scoped>
  .image-container {
      display: flex;
      flex-direction: column;
  
  }
  .custom-card {
    width: 300px; /* 自定义卡片宽度 */
    height: auto; /* 自定义卡片高度，根据内容自适应 */
    margin-bottom: 20px; /* 控制卡片之间的间距 */
  }
  p.description {
      font-size: 12px ; /* 使用 Element UI 的 Extra Small 文本类 */
      color:gray;
  }
  h2.title{
      font-size: 16px;
  }
  .image-title {
      width: 20%;
      height: 20%;
  }
  
  .image {
      width: 100%;
      height: 100%;
  }
  
  .content {
      margin-left: 5px
  }
  
  .price {
      color: red;
      font-weight: bold;
      font-size: 25px;
  }
  .sales {
      color: #333;
      font-weight: 1000;
      font-size: 13px;
      margin-bottom: 10px;
  }
  </style>