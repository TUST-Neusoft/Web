<template>
  <div class="container">
    <div class="title">
      <span><svg-icon icon-class="Order-Information" /> </span>&nbsp;&nbsp;&nbsp;
      订单信息
    </div>
    <div class="component">
      <div>
        <span>
          <svg-icon icon-class="success" style="width: 80px;height: 80px;" />
        </span>
      </div>
      <div class="success-dingdan">
        订单创建成功
      </div>
    </div>
    <div class="information">
      <h4>订单号：{{ totalAmount }}</h4>
      <h4>订单总金额：{{ totalAmount }}</h4>
      <h4>订状态：{{ totalAmount }}</h4>
      <h4>订单创建时间：{{ totalAmount }}</h4>
    </div>
    <div class="button1">
      <el-button @click="goHome">返回首页</el-button>
      <el-button type="primary" @click="goOrderManagement">立即支付</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      // 返回首页的逻辑
      // 可以使用路由导航或者直接跳转链接等方式
      this.$router.push('/home') // 示例：使用 Vue Router 跳转到首页路由
    },
    goOrderManagement () {
      // 立即支付的逻辑
      // 可以执行支付流程、跳转支付页面等操作
      console.log('开始支付流程')
      // 示例：假设支付成功后跳转到订单管理页面
      this.$router.push('/order-management')
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

.title {
  margin: 20px auto;
  /* 保留原有的左右自动边距，增加上下间距 */
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  /* 新增的下方间距 */
  font-weight: bold;

}

.title span {
  color: #000000;
  /* 可选：将文本颜色设置为白色，以便在蓝色背景上更清晰显示 */
}

.component {
  text-align: center;
  margin-top: 50px;
}

.success-dingdan {
  margin-top: 30px;
}

.information {
  margin-left: 400px;
  margin-top: 50px;
}

.button1 {
  margin-top: 30px;
  /* 增加顶部间距 */
  text-align: center;

}

.button1>.el-button:first-child {
  margin-right: 20px;
  /* 通过调整第一个按钮的右边距来增加按钮之间的间距 */
}
</style>
