<template>
  <div class="container">
    <!-- 步骤条组件 -->
    <el-steps :active="2" finish-status="success" class="custom-steps" align-center>
      <el-step title="选择支付方式" />
      <el-step title="支付成功" />
    </el-steps>

    <!-- 支付成功后显示的内容 -->
    <div class="component">
      <div>
        <span class="Success-icon">
          <svg-icon icon-class="success" style="width: 80px;height: 80px;" />
        </span>
      </div>
      <div class="success-dingdan">
        订单支付成功
      </div>
      <div class="button">
        <el-button @click="goHome">返回首页</el-button>
        <el-button type="primary" @click="goOrderManagement">订单管理</el-button>
      </div>
    </div>

  </div>
</template>

javascript
<script>
export default {
  created () {
    // 在组件创建时，可以调用 simulatePaymentSuccess 方法模拟支付成功的场景
    // 实际项目中，这里应该根据真实的支付结果来更新 active 的状态
    this.simulatePaymentSuccess()
  },
  methods: {
    // 返回首页的方法
    goHome () {
      // 使用 Vue Router 导航到首页
      this.$router.push('/home') // 修改 '/home' 为你的首页路由路径
    },
    // 进入订单管理的方法
    goOrderManagement () {
      // 使用 Vue Router 导航到订单管理页面
      this.$router.push('/order-management') // 修改 '/order-management' 为你的订单管理页面路由路径
    },
    simulatePaymentSuccess () {
      // 这里模拟支付成功后的处理，可以根据实际需求进行修改
      console.log('模拟支付成功')
      // 假设你需要在支付成功后做一些其他操作，可以在这里添加代码
    }
  }
}
</script>

<style>
.container {
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
}

.custom-steps {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

.component {
  text-align: center;
  margin-top: 50px;
}

.success-dingdan {
  margin-top: 30px;
}

.button {
  margin-top: 30px;
}
</style>
