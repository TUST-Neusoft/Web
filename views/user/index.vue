<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card style="width:100%">
          <el-menu :default-active="activeMenu" style="border-right: 0" @select="handleSelect">
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
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-main>
            <div v-if="activeMenu === '1-1'">
              <personal-info :user-data="userData" />
            </div>
            <div v-if="activeMenu === '1-2'">
              <change-password />
            </div>
            <div v-if="activeMenu === '1-3'">
              <my-collections />
            </div>
            <div v-if="activeMenu === '2-1'">
              <my-orders />
            </div>
            <div v-if="activeMenu === '3-1'">
              <recharge />
            </div>
            <div v-if="activeMenu === '3-2'">
              <transfer />
            </div>
            <div v-if="activeMenu === '3-3'">
              <expense-records />
            </div>
          </el-main>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalInfo from './components/PersonalInfo.vue'
import ChangePassword from './components/ChangePassword.vue'
import MyCollections from './components/MyCollections.vue'
import MyOrders from './components/MyOrders.vue'
import Recharge from './components/Recharge.vue'
import Transfer from './components/Transfer.vue'
import ExpenseRecords from './components/ExpenseRecords.vue'
import { getUser } from '@/api/user'

export default {
  components: {
    PersonalInfo,
    ChangePassword,
    MyCollections,
    MyOrders,
    Recharge,
    Transfer,
    ExpenseRecords
  },
  data() {
    return {
      activeMenu: '1-1',
      userData: {
        avatar: null,
        createTime: null,
        id: null,
        lastLoginTime: null,
        mail: null,
        phone: '',
        sex: null,
        updateTime: null,
        userName: '',
        userPassword: null,
        userStatus: 0
      }
    }
  },
  async mounted() {
    const show = this.$route.query.show
    console.log(show)
    if (show === 'orders') {
      this.activeMenu = '2-1'
    }
    await this.getUser()
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key
    },
    async getUser() {
      const response = await getUser()
      this.userData = response.data
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  padding: 20px 15vw;
  background-color: #f8f8f8;
}
</style>
