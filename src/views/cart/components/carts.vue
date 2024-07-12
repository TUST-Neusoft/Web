<template>
  <div>
    <div class="center-div">
      <i class="el-icon-s-shop"></i>
      <p>我的购物车</p>
    </div>
    <el-table
      ref="cartTable"
      :data="cartItems"
      style="width: 100%; padding: 20px; margin-top: 20px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="storeNo" label="商店">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.storeNo }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品"></el-table-column>
      <el-table-column prop="price" label="单价（元）"></el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.quantity" @change="updateSubtotal(scope.row)" :min="1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template slot-scope="scope">
          {{ scope.row.subtotal }} 元
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="removeItem(scope.$index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="summary-row">
      <el-checkbox v-model="selectAll" @change="handleSelectAllChange">全选</el-checkbox>
      <div class="summary-details">
        <span>已选择 <span class="highlight">{{ selectedItems.length }}</span> 件</span>
        <span>总计 <span class="highlight">{{ total }}</span> 元</span>
        <el-button type="primary" @click="checkout" class="checkout-button">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyCarts } from '@/api/carts';
import { getDetail } from '@/api/goods';
export default {
  data() {
    return {
      class01:[],
      cartItems: [
        { storeNo: '自提点01', name: '蒙牛早餐奶原味250ml*16', price: 216.00, quantity: 2, subtotal: 432.00 },
        { storeNo: '自提点02', name: '上海滩生记', price: 36.00, quantity: 2, subtotal: 72.00 }
      ],
      selectedItems: [],
      selectAll: false
    }
  },
  computed: {
    total() {
      return this.selectedItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toFixed(2);
    }
  },
  created() {
    this.getDetail();
    this.getMyCarts();
  },
  methods: {
    updateSubtotal(item) {
      item.subtotal = (item.price * item.quantity).toFixed(2);
      this.updateSelectedItems();
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.updateSelectedItems();
    },
    checkout() {
      // 结算逻辑
      alert('结算功能尚未实现');
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
      this.selectAll = this.selectedItems.length === this.cartItems.length;
    },
    handleSelectAllChange(val) {
      this.$refs.cartTable.toggleAllSelection();
    },
    updateSelectedItems() {
      const selectedIds = this.selectedItems.map(item => item.name);
      this.selectedItems = this.cartItems.filter(item => selectedIds.includes(item.name));
    },
    async getMyCarts(){
      const response = await getMyCarts()
      this.class01=response.data
      
    }
  },
  watch: {
    cartItems: {
      handler(newVal) {
        this.updateSelectedItems();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: #ffe6e6; /* 背景颜色 */
}

.summary-row {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffe6e6;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
}

.summary-details {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.checkout-button {
  margin-left: 10px;
}

/* 表头背景颜色设置为浅粉红色 */
::v-deep .el-table__header-wrapper th {
  background-color: #ffe6e6;
}

/* 高亮显示数字 */
.highlight {
  color: red;
}
</style>
