<template>
    <div class="admin-container">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item index="dashboard">仪表盘</el-menu-item>
            <el-submenu index="role-management">
              <template slot="title">角色管理</template>
              <el-menu-item index="role-management">角色列表</el-menu-item>
            </el-submenu>
            <el-submenu index="user-management">
              <template slot="title">用户管理</template>
              <el-menu-item index="user-management">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="category-management">
              <template slot="title">类别管理</template>
              <el-menu-item index="category-management">类别列表</el-menu-item>
            </el-submenu>
            <el-submenu index="product-management">
              <template slot="title">商品管理</template>
              <el-menu-item index="product-management">商品列表</el-menu-item>
            </el-submenu>
            <el-submenu index="area-management">
              <template slot="title">区域管理</template>
              <el-menu-item index="area-management">区域列表</el-menu-item>
            </el-submenu>
            <el-submenu index="store-management">
              <template slot="title">门店管理</template>
              <el-menu-item index="store-management">门店列表</el-menu-item>
            </el-submenu>
            <el-submenu index="order-management">
              <template slot="title">订单管理</template>
              <el-menu-item index="order-management">订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="promotion-management">
              <template slot="title">促销管理</template>
              <el-menu-item index="promotion-management">促销列表</el-menu-item>
            </el-submenu>
            <el-submenu index="notice-management">
              <template slot="title">通知公告</template>
              <el-menu-item index="notice-management">公告列表</el-menu-item>
            </el-submenu>
            <el-submenu index="parking-management">
              <template slot="title">车位管理</template>
              <el-menu-item index="parking-management">车位列表</el-menu-item>
            </el-submenu>
            <el-submenu index="visitor-record">
              <template slot="title">访客记录</template>
              <el-menu-item index="visitor-record">访客列表</el-menu-item>
            </el-submenu>
            <el-submenu index="repair-management">
              <template slot="title">报事报修</template>
              <el-menu-item index="repair-management">报修列表</el-menu-item>
            </el-submenu>
            <el-submenu index="payment-record">
              <template slot="title">缴纳记录</template>
              <el-menu-item index="payment-record">缴费记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
  
        <!-- 内容区域 -->
        <el-container>
          <el-header>管理员后台管理系统</el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: 'dashboard'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({ name: key });
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-container {
    height: 100vh;
  }
  
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    text-align: center;
  }
  
  .el-menu-vertical-demo {
    border-right: 0;
  }
  
  .el-menu-item {
    padding: 0 20px;
  }
  </style>
  