<template>
    <div class="container">
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeMenu" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">会员中心</template>
              <el-menu-item index="1-1">个人资料</el-menu-item>
              <el-menu-item index="1-2">密码修改</el-menu-item>
              <el-menu-item index="1-3">我的收藏</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">订单中心</template>
              <el-menu-item index="2-1">我的订单</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">钱包管理</template>
              <el-menu-item index="3-1">充值</el-menu-item>
              <el-menu-item index="3-2">转账</el-menu-item>
              <el-menu-item index="3-3">消费记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
  
        <el-container>
          <el-header> <!-- header内容 --> </el-header>
          
          <el-main>
            <div v-if="activeMenu === '1-1'">
              <personal-info></personal-info>
            </div>
            <div v-if="activeMenu === '1-2'">
              <change-password></change-password>
            </div>
            <div v-if="activeMenu === '1-3'">
              <my-collections></my-collections>
            </div>
            <div v-if="activeMenu === '2-1'">
              <my-orders></my-orders>
            </div>
            <div v-if="activeMenu === '3-1'">
              <recharge></recharge>
            </div>
            <div v-if="activeMenu === '3-2'">
              <transfer></transfer>
            </div>
            <div v-if="activeMenu === '3-3'">
              <expense-records></expense-records>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import PersonalInfo from '@/views/user/components/PersonalInfo.vue';
  import ChangePassword from '@/views/user/components/ChangePassword.vue';
  import MyCollections from '@/views/user/components/MyCollections.vue';
  import MyOrders from '@/views/user/components/MyOrders.vue';
  import Recharge from '@/views/user/components/Recharge.vue';
  import Transfer from '@/views/user/components/Transfer.vue';
  import ExpenseRecords from '@/views/user/components/ExpenseRecords.vue';
  
  export default {
    components: {
      PersonalInfo,
      ChangePassword,
      MyCollections,
      MyOrders,
      Recharge,
      Transfer,
      ExpenseRecords,
    },
    data() {
      return {
        activeMenu: '1-1' // 默认显示个人资料页面
      };
    },
    methods: {
      handleSelect(key) {
        this.activeMenu = key;
      }
    }
  };
  </script>
  
  <style>
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  </style>
  