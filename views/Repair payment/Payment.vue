<template>
  <div class="container2">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="breadcrumb-bold">物业费缴纳</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container3">
      <el-select v-model="value" placeholder="选择你的账单" class="select2">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-table :data="tableData" style="width: 100%" class="table2">
        <el-table-column prop="month" label="月份" width="400" />
        <el-table-column prop="amount" label="金额" :formatter="formatCurrency" width="400" />
        <el-table-column prop="generateTime" label="生成时间" />
      </el-table>
      <el-button type="primary" class="button2" icon="el-icon-s-finance" @click="showBalanceDialog">
        缴费
      </el-button>
    </div>
    <el-dialog title="确认缴费信息" :visible.sync="balanceDialogVisible">
      <p>缴费订单号：{{ totalAmount }}</p>
      <p>缴费金额：&yen;{{ totalAmount }}</p>
      <el-form>
        <el-form-item label="支付密码">
          <el-input v-model="paymentPassword" show-password placeholder="请输入支付密码" />
        </el-form-item>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="缴费详细" width="auto" />
          </el-table-column>
        </el-table></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-s-finance" @click="handleBalancePayment">缴费</el-button>
        <el-button icon="el-icon-close" @click="balanceDialogVisible = false">取消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAll } from '@/api/charge/'

export default {
  data () {
    return {
      value: '',
      options: [
        { value: 'bill1', label: '账单1' },
        { value: 'bill2', label: '账单2' },
        { value: 'bill3', label: '账单3' }
      ],
      tableData: [
        { month: '2023-01', amount: 100, generateTime: '2023-01-01' },
        { month: '2023-02', amount: 120, generateTime: '2023-02-01' },
        { month: '2023-03', amount: 110, generateTime: '2023-03-01' }
        // 更多账单数据...
      ],
      balanceDialogVisible: false, // 控制确认缴费弹窗显示
      paymentPassword: '', // 支付密码
      totalAmount: 0 // 总缴费金额，根据实际业务逻辑处理
    }
  },
  created () {
    this.getAll()
  },

  methods: {
    onsubmit () {

    },
    formatCurrency (row, column, cellValue, index) {
      return '¥' + cellValue
    },
    showBalanceDialog () {
      // 这里可以根据实际业务逻辑来设置总缴费金额等信息
      this.totalAmount = this.calculateTotalAmount() // 计算总金额的方法，根据实际需求实现
      this.balanceDialogVisible = true // 显示确认缴费弹窗
    },
    handleBalancePayment () {
      // 处理缴费逻辑，可以在这里实现支付请求等操作
      // 示例：假设这里只是简单地关闭弹窗
      this.balanceDialogVisible = false
    },
    calculateTotalAmount () {
      // 计算总金额的方法，根据实际需求实现
      // 这里示例简单地返回第一个账单的金额
      return this.tableData.length > 0 ? this.tableData[0].amount : 0
    },
    async getAll () {
      const response = await getAll()
      this.class01 response.data
      this.filteredClass01 = JSON.parse(JSON.stringify(this, class01))
    }
  }
}
</script>

<style>
.container2 {
  margin: 30px;
  padding: 30px;
  width: auto;
}

.container3 {
  border-top: 1px solid #ebeef5;
  /* 上边框 */
  border-bottom: 1px solid #ebeef5;
  /* 下边框 */
  border-left: 0;
  /* 左边框，可以根据需要调整或添加 */
  border-right: 0;
  /* 右边框，可以根据需要调整或添加 */
  padding: 20px;
  /* 添加内边距 */
  margin-top: 20px;
  /* 控制与上方元素的距离 */
  border-radius: 0;
  /* 可以根据需要设置边框角的圆角 */
}

.select2 {
  margin-top: 30px;
  width: 100%;
}

.table2 {
  margin-top: 30px;
}

.button2 {
  margin-top: 30px;
  width: 150px;
}
</style>
