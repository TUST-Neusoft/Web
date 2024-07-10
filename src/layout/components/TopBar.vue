<template>
  <div>
    <div class="top">
      <div style="float: left;height: 100%;">
        <router-link to="/">商城首页</router-link> |
        <router-link to="/contact">联系方式</router-link> |
        <router-link to="/about">关于我们</router-link> |
        <a>天津</a>
      </div>
      <div style="float: right;height: 100%;">
        欢迎您，KBEI |
        <router-link to="/user">个人中心</router-link> |
        <a @click="logout">注销登录</a>
      </div>
    </div>
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
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>
.top {
  height: 28px;
  padding: 5px 15vw;
  font-size: 14px;
  background-color: #f0f0f0;
}

.header {
  height: auto;
  width: 70vw;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 40px 0;
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
