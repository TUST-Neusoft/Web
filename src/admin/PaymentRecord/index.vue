<template>
    <div class="payment-record-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="缴费状态">
            <el-select v-model="search.status" placeholder="请选择缴费状态">
              <el-option label="已缴费" value="1"></el-option>
              <el-option label="未缴费" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPaymentRecord">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="paymentRecordList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderNo" label="缴费订单号" width="250"></el-table-column>
          <el-table-column prop="username" label="用户" width="150"></el-table-column>
          <el-table-column prop="status" label="缴费状态" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '已缴费' : '未缴费' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="缴费金额" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="viewBillDetail(scope.row)">查看账单</el-button>
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
  
      <!-- 账单详情对话框 -->
      <el-dialog title="账单详情" :visible.sync="billDetailDialog.visible">
        <el-table :data="billDetailDialog.data" style="width: 100%">
          <el-table-column prop="month" label="月份" width="150"></el-table-column>
          <el-table-column prop="amount" label="金额" width="150"></el-table-column>
          <el-table-column prop="payTime" label="付款时间" width="200"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="billDetailDialog.visible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          status: ''
        },
        paymentRecordList: [
          { orderNo: '202305151046', username: '用户A', status: 1, amount: '600.00', createTime: '2023-05-12 08:22:09', updateTime: '2023-05-12 12:56:49' },
          { orderNo: '202305151256', username: '用户B', status: 0, amount: '600.00', createTime: '2023-05-12 08:22:09', updateTime: '2023-05-12 10:56:44' },
        ],
        total: 2,
        pageSize: 10,
        billDetailDialog: {
          visible: false,
          data: []
        }
      };
    },
    methods: {
      searchPaymentRecord() {
        // 调用接口搜索缴费记录，演示数据直接返回
        this.paymentRecordList = this.mockPaymentRecords().filter(record => this.search.status === '' || record.status === this.search.status);
        this.total = this.paymentRecordList.length;
      },
      resetSearch() {
        this.search.status = '';
        this.searchPaymentRecord();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      viewBillDetail(record) {
        this.billDetailDialog.data = this.mockBillDetails();
        this.billDetailDialog.visible = true;
      },
      mockPaymentRecords() {
        return [
          { orderNo: '202305151046', username: '用户A', status: 1, amount: '600.00', createTime: '2023-05-12 08:22:09', updateTime: '2023-05-12 12:56:49' },
          { orderNo: '202305151256', username: '用户B', status: 0, amount: '600.00', createTime: '2023-05-12 08:22:09', updateTime: '2023-05-12 10:56:44' },
        ];
      },
      mockBillDetails() {
        return [
          { month: '2023-01', amount: '100.00', payTime: '2023-05-12 08:22:34' },
          { month: '2023-02', amount: '100.00', payTime: '2023-05-12 08:22:34' },
          { month: '2023-03', amount: '100.00', payTime: '2023-05-12 08:22:34' },
          { month: '2023-04', amount: '100.00', payTime: '2023-05-12 08:22:34' },
          { month: '2023-05', amount: '100.00', payTime: '2023-05-12 08:22:34' }
        ];
      }
    },
    mounted() {
      this.searchPaymentRecord();
    }
  };
  </script>
  
  <style scoped>
  .payment-record-container {
    padding: 20px;
  }
  
  .dialog-footer {
    text-align: right;
  }
  
  .el-form-item {
    margin-bottom: 10px;
  }
  
  .el-table th, .el-table td {
    text-align: center;
  }
  
  .el-table .el-table__header-wrapper th {
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
  }
  </style>
  