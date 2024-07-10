<template>
  <div class="order-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="search.orderId" placeholder="请输入订单编号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="search.orderStatus" placeholder="请选择订单状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待发货" value="2"></el-option>
            <el-option label="已发货" value="3"></el-option>
            <el-option label="已取消" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchOrder">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="batchDeliver" :disabled="multipleSelection.length === 0">批量发货</el-button>
      <el-table :data="orderList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderId" label="订单编号" width="150"></el-table-column>
        <el-table-column prop="customer" label="创建用户" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
        <el-table-column prop="paymentType" label="支付方式" width="100"></el-table-column>
        <el-table-column prop="paymentStatus" label="支付状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getPaymentStatusTag(scope.row.paymentStatus)">{{ getPaymentStatusLabel(scope.row.paymentStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryStatus" label="配送方式" width="120"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="getOrderStatusTag(scope.row.orderStatus)">{{ getOrderStatusLabel(scope.row.orderStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="store" label="所属门店" width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="viewOrderDetail(scope.row)">查看详情</el-button>
            <el-button size="mini" type="primary" @click="deliverOrder(scope.row)" :disabled="scope.row.orderStatus === 3 || scope.row.orderStatus === 4">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handlePageChange">
      </el-pagination>
    </el-card>

    <!-- 订单详情对话框 -->
    <el-dialog title="订单商品详情" :visible.sync="orderDetailDialog.visible" width="50%">
      <el-table :data="orderDetailDialog.data" style="width: 100%">
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="productImage" label="商品图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.productImage" style="width: 50px; height: 50px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productPrice" label="商品单价"></el-table-column>
        <el-table-column prop="productQuantity" label="购买数量"></el-table-column>
        <el-table-column prop="subtotal" label="小计"></el-table-column>
      </el-table>
      <div class="total-price" style="text-align: right; margin-top: 20px;">
        总价: <span style="color: red;">{{ totalPrice }}元</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderDetailDialog.visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        orderId: '',
        orderStatus: ''
      },
      orderList: [
        { orderId: '20230425104430', customer: '用户A', orderAmount: 504.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 2, store: '门店A', createTime: '2023-04-25 10:44:30', updateTime: '2023-04-25 10:49:42' },
        { orderId: '20230425113015', customer: '用户B', orderAmount: 230.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 3, store: '门店B', createTime: '2023-04-25 11:30:15', updateTime: '2023-04-25 11:35:16' },
        { orderId: '20230425124521', customer: '用户C', orderAmount: 340.00, paymentType: '线下支付', paymentStatus: 1, deliveryStatus: '自提', orderStatus: 3, store: '门店C', createTime: '2023-04-25 12:45:21', updateTime: '2023-04-25 12:50:30' },
        { orderId: '20230425135045', customer: '用户D', orderAmount: 120.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 4, store: '门店D', createTime: '2023-04-25 13:50:45', updateTime: '2023-04-25 13:55:50' },
        { orderId: '20230425150132', customer: '用户E', orderAmount: 150.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 2, store: '门店E', createTime: '2023-04-25 15:01:32', updateTime: '2023-04-25 15:06:40' }
      ],
      total: 5,
      pageSize: 10,
      multipleSelection: [],
      orderDetailDialog: {
        visible: false,
        data: []
      },
      totalPrice: 0
    };
  },
  methods: {
    searchOrder() {
      // 模拟搜索订单逻辑
      this.orderList = this.mockOrders().filter(order => order.orderId.includes(this.search.orderId) && (!this.search.orderStatus || order.orderStatus == this.search.orderStatus));
      this.total = this.orderList.length;
    },
    resetSearch() {
      this.search.orderId = '';
      this.search.orderStatus = '';
      this.searchOrder();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    viewOrderDetail(order) {
      // 模拟查询订单详情
      this.orderDetailDialog.data = this.mockOrderDetails(order.orderId);
      this.totalPrice = this.orderDetailDialog.data.reduce((acc, item) => acc + item.subtotal, 0);
      this.orderDetailDialog.visible = true;
    },
    deliverOrder(order) {
      this.$confirm('是否确认发货该订单？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟发货逻辑
        order.orderStatus = 3;
        order.updateTime = this.formatDate(new Date());
        this.$message({
          type: 'success',
          message: '发货成功!'
        });
      }).catch(() => {});
    },
    batchDeliver() {
      this.$confirm('是否确认批量发货所选订单？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟批量发货逻辑
        this.multipleSelection.forEach(order => {
          order.orderStatus = 3;
          order.updateTime = this.formatDate(new Date());
        });
        this.$message({
          type: 'success',
          message: '批量发货成功!'
        });
      }).catch(() => {});
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockOrders() {
      return [
        { orderId: '20230425104430', customer: '用户A', orderAmount: 504.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 2, store: '门店A', createTime: '2023-04-25 10:44:30', updateTime: '2023-04-25 10:49:42' },
        { orderId: '20230425113015', customer: '用户B', orderAmount: 230.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 3, store: '门店B', createTime: '2023-04-25 11:30:15', updateTime: '2023-04-25 11:35:16' },
        { orderId: '20230425124521', customer: '用户C', orderAmount: 340.00, paymentType: '线下支付', paymentStatus: 1, deliveryStatus: '自提', orderStatus: 3, store: '门店C', createTime: '2023-04-25 12:45:21', updateTime: '2023-04-25 12:50:30' },
        { orderId: '20230425135045', customer: '用户D', orderAmount: 120.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 4, store: '门店D', createTime: '2023-04-25 13:50:45', updateTime: '2023-04-25 13:55:50' },
        { orderId: '20230425150132', customer: '用户E', orderAmount: 150.00, paymentType: '线上支付', paymentStatus: 2, deliveryStatus: '快递', orderStatus: 2, store: '门店E', createTime: '2023-04-25 15:01:32', updateTime: '2023-04-25 15:06:40' }
      ];
    },
    mockOrderDetails(orderId) {
      return [
        { productName: '商品1', productImage: 'https://via.placeholder.com/50', productPrice: 110.00, productQuantity: 5, subtotal: 550.00 },
        { productName: '商品2', productImage: 'https://via.placeholder.com/50', productPrice: 120.00, productQuantity: 2, subtotal: 240.00 }
      ];
    },
    getPaymentStatusLabel(status) {
      const statusLabels = { 1: '未支付', 2: '已支付' };
      return statusLabels[status] || '未知';
    },
    getPaymentStatusTag(status) {
      const statusTags = { 1: 'info', 2: 'success' };
      return statusTags[status] || 'info';
    },
    getOrderStatusLabel(status) {
      const statusLabels = { 2: '待发货', 3: '已发货', 4: '已取消' };
      return statusLabels[status] || '未知';
    },
    getOrderStatusTag(status) {
      const statusTags = { 2: 'info', 3: 'success', 4: 'danger' };
      return statusTags[status] || 'info';
    }
  },
  mounted() {
    this.searchOrder();
  }
};
</script>

<style scoped>
.order-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
  text-align: left;
}

.custom-table .el-table th, .custom-table .el-table td {
  text-align: center;
}

.custom-table .el-table .el-table__header-wrapper th {
  background-color: #f5f7fa;
}

.el-table {
  width: 100%;
}

.el-card {
  width: 100%;
}

.el-form-inline .el-form-item {
  margin-right: 10px;
  text-align: left;
}
</style>
