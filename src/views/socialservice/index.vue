<template >
    <div style="background-color: #fff3f3;">
      <div class="container" style="padding: 20px">
        <el-menu
          default-active="notification"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="notification" @click="currentComponent = 'Notification'">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">通知公告</span>
          </el-menu-item>
          <el-menu-item index="parking-management" @click="currentComponent = 'ParkingManagement'">
            <i class="el-icon-location-outline"></i>
            <span slot="title">车位管理</span>
          </el-menu-item>
          <el-menu-item index="visitor-registration" @click="currentComponent = 'VisitorRegistration'">
            <i class="el-icon-right"></i>
            <span slot="title">访客登记</span>
          </el-menu-item>
          <el-menu-item index="repair-report" @click="currentComponent = 'RepairReport'">
            <i class="el-icon-setting"></i>
            <span slot="title">报事报修</span>
          </el-menu-item>
          <el-menu-item index="property-fee-payment" @click="currentComponent = 'PropertyFeePayment'">
            <i class="el-icon-bank-card"></i>
            <span slot="title">物业费缴纳</span>
          </el-menu-item>
        </el-menu>
        <div class="content">
          
            <component :is="currentComponent"></component>
          
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    margin-top: 30px;
    margin-left: 80px;
    border-radius: 2px;
    width: 100%;
    display: flex;
  }
  
  .el-menu-vertical-demo {
    border: 1px solid #dcdfe6;
    height: 300px;

  }
  
  .content {
    flex: 1;
    padding: 20px;
    margin-left: 20px;
    border: 1px solid #dcdfe6;
    height: 1000px;
    background-color: white;
    margin-right: 200px;
  }
  </style>
  
  <script>
  import Notification from '@/views/ZhaoYuLong/components/Notification.vue'
  import ParkingManagement from '@/views/ZhaoYuLong/components/ParkingManagement.vue'
  import VisitorRegistration from '@/views/ZhaoYuLong/components/VisitorRegistration.vue'
  import RepairReport from '@/views/ZhaoYuLong/components/RepairReport.vue'
  import PropertyFeePayment from '@/views/ZhaoYuLong/components/PropertyFeePayment.vue'
  
  export default {
    components: {
      Notification,
      ParkingManagement,
      VisitorRegistration,
      RepairReport,
      PropertyFeePayment
    },
    data() {
      return {
        currentComponent: 'Notification'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  
