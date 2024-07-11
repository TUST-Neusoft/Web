<template>
  <div class="wallet-logs-container">
    <h2 class="title">消费记录</h2>
    <el-form :inline="true" :model="filters" class="filter-form">
      <el-form-item label="支付状态">
        <el-select v-model="filters.status" placeholder="全部">
          <el-option label="全部" value="0" />
          <el-option label="成功" value="1" />
          <el-option label="失败" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付类型">
        <el-select v-model="filters.type" placeholder="全部">
          <el-option label="全部" value="0" />
          <el-option label="商品支付" value="1" />
          <el-option label="充值" value="2" />
          <el-option label="转入" value="3" />
          <el-option label="转出" value="4" />
          <el-option label="退款" value="5" />
          <el-option label="缴费支付" value="6" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchLogs">搜索</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="logs" stripe class="full-width-table">
      <el-table-column prop="orderNo" label="订单号" width="250" align="center" />
      <el-table-column prop="operationType" label="操作类型" align="center">
        <template #default="{ row }">
          {{ getOperationTypeLabel(row.operationType) }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="操作金额" align="center" />
      <el-table-column prop="status" label="操作结果" align="center">
        <template #default="{ row }">
          <el-tag type="success" class="result-tag">成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" label="操作时间" align="center" />
    </el-table>
    <div class="pagination-container">
      <el-pagination background layout="prev, pager, next" :total="totalLogs" :page-size="pageSize"
        @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filters: {
        status: '0',
        type: '0'
      },
      logs: [],
      loading: false,
      totalLogs: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  mounted () {
    this.fetchLogs()
  },
  methods: {
    fetchLogs () {
      this.loading = true
      setTimeout(() => {
        const filteredLogs = this.mockLogs().filter(log => {
          const statusMatch = this.filters.status === '0' || log.status.toString() === this.filters.status
          const typeMatch = this.filters.type === '0' || log.operationType.toString() === this.filters.type
          return statusMatch && typeMatch
        })
        this.totalLogs = filteredLogs.length
        const start = (this.currentPage - 1) * this.pageSize
        const end = start + this.pageSize
        this.logs = filteredLogs.slice(start, end)
        this.loading = false
      }, 500)
    },
    resetFilters () {
      this.filters.status = '0'
      this.filters.type = '0'
      this.fetchLogs()
    },
    handlePageChange (page) {
      this.currentPage = page
      this.fetchLogs()
    },
    getOperationTypeLabel (type) {
      const types = {
        1: '商品支付',
        2: '充值',
        3: '转入',
        4: '转出',
        5: '退款',
        6: '缴费支付'
      }
      return types[type] || '未知类型'
    },
    mockLogs () {
      const logs = []
      for (let i = 0; i < 100; i++) {
        logs.push({
          orderNo: `20240425104438650532${i}`,
          operationType: (i % 6) + 1,
          amount: (Math.random() * 1000).toFixed(2),
          status: 1,
          timestamp: `2024-05-15 14:53:${(i % 60).toString().padStart(2, '0')}`
        })
      }
      return logs
    }
  }
}
</script>

<style scoped>
.wallet-logs-container {
  margin-top: -30px;
  margin-left: 20px;
  width: 100%;
  height: 80vh;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.filter-form {
  margin-bottom: 20px;
}

.full-width-table {
  width: 100%;
  height: 100%;
}

.el-table th,
.el-table td {
  padding: 10px;
  text-align: center;
}

.el-table {
  width: 100%;
  height: 100%;
}

.el-table .el-table__header-wrapper {
  background: #f5f7fa;
}

.el-table .el-table__body-wrapper {
  overflow-x: auto;
}

.el-tag.result-tag {
  width: auto;
  text-align: center;
  padding: 1px 15px;
  font-size: 14px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
