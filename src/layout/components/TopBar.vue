<template>
  <div>
    <div> </div>
    <div class="header">
      <el-image :src="require('@/assets/neulogo.png')" class="logo" />
      <el-input v-model="search" placeholder="搜索" class="search-input" />
      <el-button type="primary">搜索</el-button>
      <el-badge :value="12" class="item" style="margin-left: 70px">
        <el-button>我的购物车<i class="el-icon-shopping-cart-2" /></el-button>
      </el-badge>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>
.top{
    width: 100vw;
    height: 30px;
    background-color: #7f7f7f;
}
.header {
    height: auto;
    width: 60vw;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
}

.logo {
    height: 80px;
    margin-right: 20px;
}

.search-input {
    flex: 1;
    margin: 0 30px;
}

.login-button {
    margin-left: 10px;
}
</style>
