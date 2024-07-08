<template>
    <div class="visitor-management-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="访客姓名">
            <el-input v-model="search.visitorName" placeholder="请输入访客姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchVisitor">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="visitorList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="访客ID" width="100"></el-table-column>
          <el-table-column prop="visitorName" label="访客姓名" width="200"></el-table-column>
          <el-table-column prop="visitorStatus" label="来访状态" width="200">
            <template slot-scope="scope">
              <el-tag :type="getVisitorStatusTag(scope.row.visitorStatus)">{{ getVisitorStatusLabel(scope.row.visitorStatus) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="visitorPurpose" label="来访目的" width="200"></el-table-column>
          <el-table-column prop="visitorDate" label="来访日期" width="200"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="confirmUpdateVisitorStatus(scope.row.id)"
                v-if="scope.row.visitorStatus === 0"
              >
                放行
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </el-card>
      <!-- 系统提示对话框 -->
      <el-dialog
        title="系统提示"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogVisible = false"
      >
        <span>是否确认更新来访状态？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateVisitorStatus">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          visitorName: ''
        },
        visitorList: [
          // 示例数据
          { id: 1, visitorName: '张三', visitorStatus: 0, visitorPurpose: '拜访朋友', visitorDate: '2023-05-11', createTime: '2023-05-11 16:15:25', updateTime: '--' },
          { id: 2, visitorName: '李四', visitorStatus: 1, visitorPurpose: '业务洽谈', visitorDate: '2023-05-10', createTime: '2023-05-10 16:22:22', updateTime: '--' },
          { id: 3, visitorName: '王五', visitorStatus: 0, visitorPurpose: '送快递', visitorDate: '2023-05-09', createTime: '2023-05-09 16:13:24', updateTime: '--' },
          { id: 4, visitorName: '赵六', visitorStatus: 1, visitorPurpose: '拜访客户', visitorDate: '2023-05-08', createTime: '2023-05-08 16:13:24', updateTime: '--' },
          { id: 5, visitorName: '孙七', visitorStatus: 0, visitorPurpose: '参加会议', visitorDate: '2023-05-07', createTime: '2023-05-07 16:13:24', updateTime: '--' },
        ],
        total: 5,
        pageSize: 10,
        dialogVisible: false,
        selectedVisitorId: null
      };
    },
    methods: {
      searchVisitor() {
        // 调用接口搜索访客，演示数据直接返回
        this.visitorList = this.mockVisitors().filter(visitor => visitor.visitorName.includes(this.search.visitorName));
        this.total = this.visitorList.length;
      },
      resetSearch() {
        this.search.visitorName = '';
        this.searchVisitor();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      handleSelectionChange(selection) {
        // 处理选择变化
      },
      confirmUpdateVisitorStatus(visitorId) {
        this.selectedVisitorId = visitorId;
        this.dialogVisible = true;
      },
      updateVisitorStatus() {
        const visitor = this.visitorList.find(v => v.id === this.selectedVisitorId);
        if (visitor) {
          visitor.visitorStatus = 1; // 更新为已来访
          visitor.updateTime = this.formatDate(new Date()); // 更新修改时间
        }
        this.dialogVisible = false;
      },
      getVisitorStatusLabel(status) {
        return status === 1 ? '已来访' : '未来访';
      },
      getVisitorStatusTag(status) {
        return status === 1 ? 'success' : 'danger';
      },
      formatDate(date) {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${min}`;
      },
      mockVisitors() {
        return [
          { id: 1, visitorName: '张三', visitorStatus: 0, visitorPurpose: '拜访朋友', visitorDate: '2023-05-11', createTime: '2023-05-11 16:15:25', updateTime: '--' },
          { id: 2, visitorName: '李四', visitorStatus: 1, visitorPurpose: '业务洽谈', visitorDate: '2023-05-10', createTime: '2023-05-10 16:22:22', updateTime: '--' },
          { id: 3, visitorName: '王五', visitorStatus: 0, visitorPurpose: '送快递', visitorDate: '2023-05-09', createTime: '2023-05-09 16:13:24', updateTime: '--' },
          { id: 4, visitorName: '赵六', visitorStatus: 1, visitorPurpose: '拜访客户', visitorDate: '2023-05-08', createTime: '2023-05-08 16:13:24', updateTime: '--' },
          { id: 5, visitorName: '孙七', visitorStatus: 0, visitorPurpose: '参加会议', visitorDate: '2023-05-07', createTime: '2023-05-07 16:13:24', updateTime: '--' },
        ];
      }
    },
    mounted() {
      this.searchVisitor();
    }
  };
  </script>
  
  <style scoped>
  .visitor-management-container {
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
  