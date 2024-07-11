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
        <el-table :data="tableDataForDialog" style="width: 100%">
          <el-table-column prop="date" label="缴费详细" width="auto" />
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-s-finance" @click="handleBalancePayment">缴费</el-button>
        <el-button icon="el-icon-close" @click="balanceDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMyCharge } from '@/api/charge'

export default {
  data () {
    return {
      value: '', // 这里可以根据实际需要设置合适的初始值和类型
      options: [], // 这里是一个空数组，需要确保在填充前进行类型定义
      tableData: [], // 初始化为空数组，等待获取账单数据后填充
      tableDataForDialog: [], // 用于确认缴费信息对话框的数据，同样需要类型定义
      balanceDialogVisible: false,
      paymentPassword: '',
      totalAmount: 0
    }
  },
  created () {
    this.getMyCharge()
  },

  methods: {
    async getMyCharge () {
      try {
        const response = await getMyCharge()
        this.tableData = response.data // 填充账单数据到tableData数组
        this.generateOptionsFromTableData() // 根据tableData生成options数组
        this.tableDataForDialog = response.data // 同时填充确认缴费信息对话框的数据
      } catch (error) {
        console.error('Failed to fetch charge data', error)
      }
    },
    generateOptionsFromTableData () {
      // 根据tableData生成options数组
      const options = []
      const halfYearBills = this.groupByHalfYear(this.tableData)

      halfYearBills.forEach((bill, index) => {
        const startDate = bill[0].startDate // 假设startDate是账单起始日期
        const endDate = bill[bill.length - 1].endDate // 假设endDate是账单结束日期
        const totalAmount = this.calculateTotalAmount(bill)

        options.push({
          value: index, // 使用索引作为value
          label: `${startDate} 至 ${endDate} 的账单，总金额：¥${totalAmount}`
        })
      })

      this.options = options
    },
    groupByHalfYear (data) {
      // 根据半年来分组账单数据
      // 这里假设data是按日期排序的账单数据数组
      const halfYearBills = []
      let currentHalfYear = []

      data.forEach(item => {
        // 假设按半年分组的逻辑是以每年6月和12月为分界点
        // 这里的逻辑可以根据实际需求进行调整
        const month = new Date(item.date).getMonth() + 1
        if (month === 6 || month === 12) {
          if (currentHalfYear.length > 0) {
            halfYearBills.push(currentHalfYear)
          }
          currentHalfYear = []
        }
        currentHalfYear.push(item)
      })

      if (currentHalfYear.length > 0) {
        halfYearBills.push(currentHalfYear)
      }

      return halfYearBills
    },
    calculateTotalAmount (bill) {
      // 计算账单的总金额
      return bill.reduce((total, item) => total + item.amount, 0)
    },
    formatCurrency (row, column, cellValue, index) {
      return '¥' + cellValue
    },
    showBalanceDialog () {
      this.totalAmount = this.calculateTotalAmount(this.tableData)
      this.balanceDialogVisible = true
    },
    handleBalancePayment () {
      // 这里处理缴费逻辑，例如向后端发送支付请求等
      this.balanceDialogVisible = false
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
