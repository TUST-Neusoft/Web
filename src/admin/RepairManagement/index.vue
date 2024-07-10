<template>
    <div class="complaint-management-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="投诉内容">
            <el-input v-model="search.content" placeholder="请输入投诉内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchComplaints">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="complaintList" style="width: 100%" class="custom-table">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="投诉ID" width="80"></el-table-column>
          <el-table-column prop="userName" label="用户名称" width="120"></el-table-column>
          <el-table-column prop="content" label="投诉内容" width="300"></el-table-column>
          <el-table-column prop="status" label="投诉状态" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">{{ scope.row.status === 1 ? '已处理' : '未处理' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="viewComplaint(scope.row)">查看</el-button>
              <el-button size="mini" type="success" @click="confirmHandle(scope.row)" v-if="scope.row.status === 0">处理完成</el-button>
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
  
      <!-- 查看投诉内容对话框 -->
      <el-dialog title="内容详情" :visible.sync="viewDialog.visible">
        <div>{{ viewDialog.content }}</div>
        <el-button @click="viewDialog.visible = false" style="margin-top: 20px;">关闭</el-button>
      </el-dialog>
  
      <!-- 处理确认对话框 -->
      <el-dialog title="系统提示" :visible.sync="confirmDialog.visible">
        <div>是否确认处理该投诉？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="handleComplaint">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          content: ''
        },
        complaintList: [
          // 示例数据
          { id: 1, userName: '用户A', content: '电梯故障', status: 0, createTime: '2023-05-10 10:24:11', updateTime: '' },
          { id: 2, userName: '用户B', content: '水管漏水', status: 0, createTime: '2023-05-10 10:24:27', updateTime: '' },
          { id: 3, userName: '用户C', content: '噪音扰民', status: 1, createTime: '2023-05-10 10:28:28', updateTime: '2023-05-10 14:24:29' },
        ],
        total: 3,
        pageSize: 10,
        viewDialog: {
          visible: false,
          content: ''
        },
        confirmDialog: {
          visible: false,
          complaint: null
        }
      };
    },
    methods: {
      searchComplaints() {
        // 调用接口搜索投诉，演示数据直接返回
        this.complaintList = this.mockComplaints().filter(complaint => complaint.content.includes(this.search.content));
        this.total = this.complaintList.length;
      },
      resetSearch() {
        this.search.content = '';
        this.searchComplaints();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      viewComplaint(complaint) {
        this.viewDialog.content = complaint.content;
        this.viewDialog.visible = true;
      },
      confirmHandle(complaint) {
        this.confirmDialog.complaint = complaint;
        this.confirmDialog.visible = true;
      },
      handleComplaint() {
        if (this.confirmDialog.complaint) {
          this.confirmDialog.complaint.status = 1;
          this.confirmDialog.complaint.updateTime = this.formatDate(new Date());
        }
        this.confirmDialog.visible = false;
      },
      formatDate(date) {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${min}`;
      },
      mockComplaints() {
        return [
          { id: 1, userName: '用户A', content: '电梯故障', status: 0, createTime: '2023-05-10 10:24:11', updateTime: '' },
          { id: 2, userName: '用户B', content: '水管漏水', status: 0, createTime: '2023-05-10 10:24:27', updateTime: '' },
          { id: 3, userName: '用户C', content: '噪音扰民', status: 1, createTime: '2023-05-10 10:28:28', updateTime: '2023-05-10 14:24:29' },
        ];
      }
    },
    mounted() {
      this.searchComplaints();
    }
  };
  </script>
  
  <style scoped>
  .complaint-management-container {
    padding: 20px;
  }
  
  .dialog-footer {
    text-align: right;
  }
  
  .el-form-item {
    margin-bottom: 10px;
  }
  
  .add-complaint-btn {
    margin-left: 10px;
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
  