<template>
  <div class="container">
    <div class="title">
      <span><svg-icon icon-class="Order-Information" /></span>&nbsp;&nbsp;&nbsp;
      订单信息
    </div>
    <div class="component">
      <div>
        <span>
          <svg-icon icon-class="success" style="width: 80px; height: 80px;" />
        </span>
      </div>
      <div class="success-dingdan">
        订单创建成功
      </div>
    </div>
    <div class="information">
      <h4>订单号：{{ orderNumber }}</h4>
      <h4>订单总金额：{{ totalAmount }}</h4>
      <h4>订单状态：{{ orderStatus }}</h4>
      <h4>订单创建时间：{{ orderCreatedAt }}</h4>
    </div>
    <div class="button1">
      <el-button @click="goHome">返回首页</el-button>
      <el-button type="primary" @click="goOrderManagement">立即支付</el-button>
    </div>
  </div>
</template>

<script>
import { getAllOrders } from '@/api/orders'; // 确保导入正确的方法

export default {
  data () {
    return {
      orderNumber: '', // 订单号
      totalAmount: '', // 订单总金额
      orderStatus: '', // 订单状态
      orderCreatedAt: '' // 订单创建时间
    };
  },
  created () {
    this.fetchOrderDetails(); // 改为调用正确的方法
  },
  methods: {
    async fetchOrderDetails () {
      try {
        const response = await getAllOrders(); // 调用正确的 API 方法
        const orderDetails = response.data; // 假设 API 返回的数据结构包含订单详情
        this.orderNumber = orderDetails.orderNumber; // 更新订单号
        this.totalAmount = orderDetails.totalAmount; // 更新订单总金额
        this.orderStatus = orderDetails.orderStatus; // 更新订单状态
        this.orderCreatedAt = orderDetails.createdAt; // 更新订单创建时间
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    },
    goHome () {
      this.$router.push('/home'); // 示例：使用 Vue Router 跳转到首页路由
    },
    goOrderManagement () {
      console.log('开始支付流程');
      // 示例：支付成功后跳转到订单管理页面
      this.$router.push('/order-management');
    }
  }
};
</script>

<style>
.container {
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
}

.title {
  margin: 20px auto;
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.title span {
  color: #000000;
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
  /* 根据实际需要调整 */
  margin-top: 50px;
  /* 根据实际需要调整 */
}

.button1 {
  margin-top: 30px;
  text-align: center;
}

.button1>.el-button:first-child {
  margin-right: 20px;
}
</style>
