<template>
  <div class="order-container">
    <h2 class="title">我的订单</h2>
    <el-form :inline="true" :model="filters" class="filter-form">
      <el-form-item label="订单类型">
        <el-select v-model="filters.status" placeholder="全部订单">
          <el-option label="全部订单" value="0"></el-option>
          <el-option label="未支付" value="-1"></el-option>
          <el-option label="待发货" value="2"></el-option>
          <el-option label="已发货" value="3"></el-option>
          <el-option label="已完成" value="9"></el-option>
          <el-option label="已关闭" value="-9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="filters.orderNo" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="filters.startTime" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="filters.endTime" type="date" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchOrders">搜索</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-for="order in orders" :key="order.orderNo" class="order">
      <div class="order-header">
        <span>订单号：{{ order.orderNo }}</span>
        <span>状态：<el-tag :type="getStatusType(order.status)">{{ getStatusLabel(order.status) }}</el-tag></span>
        <span>{{ order.orderTime }}</span>
      </div>
      <div v-for="item in order.items" :key="item.id" class="order-item">
        <img :src="item.image" class="item-image" />
        <div class="item-info">
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">￥{{ item.price }}</span>
            <span class="item-quantity">x {{ item.quantity }}</span>
            <span class="total-price">总价：￥{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div class="order-footer">
        <span class="total-price-container">总价：<span class="total-price">￥{{ order.totalPrice }}</span></span>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalOrders"
        :page-size="pageSize"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        status: '0',
        orderNo: '',
        startTime: '',
        endTime: ''
      },
      orders: [],
      loading: false,
      totalOrders: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    fetchOrders() {
      this.loading = true;
      setTimeout(() => {
        const filteredOrders = this.mockOrders().filter(order => {
          const statusMatch = this.filters.status === '0' || order.status.toString() === this.filters.status;
          const orderNoMatch = !this.filters.orderNo || order.orderNo.includes(this.filters.orderNo);
          const startTimeMatch = !this.filters.startTime || new Date(order.orderTime) >= new Date(this.filters.startTime);
          const endTimeMatch = !this.filters.endTime || new Date(order.orderTime) <= new Date(this.filters.endTime);
          return statusMatch && orderNoMatch && startTimeMatch && endTimeMatch;
        });
        this.totalOrders = filteredOrders.length;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.orders = filteredOrders.slice(start, end);
        this.loading = false;
      }, 500);
    },
    resetFilters() {
      this.filters.status = '0';
      this.filters.orderNo = '';
      this.filters.startTime = '';
      this.filters.endTime = '';
      this.fetchOrders();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchOrders();
    },
    getStatusLabel(status) {
      const statusLabels = {
        '-1': '未支付',
        '2': '待发货',
        '3': '已发货',
        '9': '已完成',
        '-9': '已关闭'
      };
      return statusLabels[status] || '未知状态';
    },
    getStatusType(status) {
      const statusTypes = {
        '-1': 'info',
        '2': 'warning',
        '3': 'primary',
        '9': 'success',
        '-9': 'danger'
      };
      return statusTypes[status] || 'info';
    },
    mockOrders() {
      const orders = [];
      const statuses = [-1, 2, 3, 9, -9];
      const names = ['上海寻宝记', '蒙牛早餐奶原麦250ml*16', '漫画中国成语'];
      for (let i = 0; i < 10; i++) {
        orders.push({
          orderNo: `20240425104438650532${i}`,
          items: [
            { id: 1, name: names[i % 3], image: 'https://via.placeholder.com/50', price: 36, quantity: 2 },
            { id: 2, name: names[(i + 1) % 3], image: 'https://via.placeholder.com/50', price: 216, quantity: 2 }
          ],
          totalPrice: 504,
          status: statuses[i % statuses.length],
          orderTime: `2024-04-25 10:44:39`
        });
        orders.push({
          orderNo: `2023051513450738912264${i}`,
          items: [
            { id: 3, name: names[(i + 2) % 3], image: 'https://via.placeholder.com/50', price: 36, quantity: 2 }
          ],
          totalPrice: 72,
          status: statuses[(i + 1) % statuses.length],
          orderTime: `2023-05-15 13:54:06`
        });
      }
      return orders;
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.order-container {
  padding: 20px;
  margin-top: -30px; /* 调整这个值来向上或向下移动表单 */
  margin-left: 20px; /* 调整这个值来改变整个表单的位置 */
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.filter-form {
  margin-bottom: 20px;
}

.order {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
}

.order-header, .order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.item-details {
  display: flex;
  justify-content: space-between;
}

.item-name {
  font-weight: bold;
  flex: 2;
}

.item-price, .item-quantity, .total-price {
  margin-left: 10px;
  flex: 1;
}

.total-price {
  color: #ff4d4f;
}

.total-price-container {
  display: flex;
  justify-content: flex-end; /* 调整左右位置 */
  align-items: center; /* 调整上下位置 */
  margin-left: 710px; /* 向右移动 */
  margin-right: 0px; /* 向左移动 */
  margin-top: 20px; /* 向下移动 */
  margin-bottom: 0px; /* 向上移动 */
}

.total-price {
  color: #ff4d4f;
  font-weight: bold;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
