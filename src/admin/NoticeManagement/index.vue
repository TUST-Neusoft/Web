<template>
    <div class="notice-management-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="公告标题">
            <el-input v-model="search.title" placeholder="请输入公告标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchNotice">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="openAddNoticeDialog" class="add-notice-btn">发布公告</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="noticeList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="公告ID" width="100"></el-table-column>
          <el-table-column prop="title" label="公告标题" width="200"></el-table-column>
          <el-table-column prop="status" label="公告状态" width="150">
            <template slot-scope="scope">
              <el-tag :type="getNoticeStatusTag(scope.row.status)">{{ getNoticeStatusLabel(scope.row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updatedTime" label="更新时间" width="200"></el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-button size="mini" @click="openEditNoticeDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteNotice(scope.row.id)">删除</el-button>
              <el-button size="mini" type="primary" @click="toggleNoticeStatus(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用' }}</el-button>
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
  
      <!-- 添加/编辑公告对话框 -->
      <el-dialog :title="noticeDialog.title" :visible.sync="noticeDialog.visible">
        <el-form :model="noticeDialog.data" label-width="120px">
          <el-form-item label="公告标题">
            <el-input v-model="noticeDialog.data.title"></el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input type="textarea" v-model="noticeDialog.data.content"></el-input>
          </el-form-item>
          <el-form-item label="公告状态">
            <el-radio-group v-model="noticeDialog.data.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="noticeDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="saveNotice">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          title: ''
        },
        noticeList: [
          // 示例数据
          { id: 1, title: '公告1', content: '这是公告1的内容', status: 1, createdTime: '2023-01-01 10:00', updatedTime: '2023-01-02 12:00' },
          { id: 2, title: '公告2', content: '这是公告2的内容', status: 0, createdTime: '2023-01-01 11:00', updatedTime: '2023-01-02 13:00' }
        ],
        total: 2,
        pageSize: 10,
        noticeDialog: {
          title: '发布公告',
          visible: false,
          data: {}
        }
      };
    },
    methods: {
      searchNotice() {
        // 调用接口搜索公告，演示数据直接返回
        this.noticeList = this.mockNotices().filter(notice => notice.title.includes(this.search.title));
        this.total = this.noticeList.length;
      },
      resetSearch() {
        this.search.title = '';
        this.searchNotice();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      openAddNoticeDialog() {
        this.noticeDialog.title = '发布公告';
        this.noticeDialog.data = { title: '', content: '', status: 1 };
        this.noticeDialog.visible = true;
      },
      openEditNoticeDialog(notice) {
        this.noticeDialog.title = '编辑公告';
        this.noticeDialog.data = { ...notice };
        this.noticeDialog.visible = true;
      },
      saveNotice() {
        // 保存公告信息的逻辑
        if (this.noticeDialog.data.id) {
          const index = this.noticeList.findIndex(item => item.id === this.noticeDialog.data.id);
          if (index !== -1) {
            this.noticeList[index] = { ...this.noticeDialog.data, updatedTime: this.formatDate(new Date()) };
          }
        } else {
          this.noticeDialog.data.createdTime = this.formatDate(new Date());
          this.noticeDialog.data.updatedTime = this.formatDate(new Date());
          this.noticeDialog.data.id = this.noticeList.length + 1;
          this.noticeList.push(this.noticeDialog.data);
        }
        this.noticeDialog.visible = false;
      },
      deleteNotice(noticeId) {
        // 删除公告的逻辑
        this.noticeList = this.noticeList.filter(notice => notice.id !== noticeId);
        this.total = this.noticeList.length;
      },
      toggleNoticeStatus(notice) {
        notice.status = notice.status === 1 ? 0 : 1;
        notice.updatedTime = this.formatDate(new Date());
      },
      getNoticeStatusLabel(status) {
        return status === 1 ? '正常' : '停用';
      },
      getNoticeStatusTag(status) {
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
      mockNotices() {
        return [
          { id: 1, title: '公告1', content: '这是公告1的内容', status: 1, createdTime: '2023-01-01 10:00', updatedTime: '2023-01-02 12:00' },
          { id: 2, title: '公告2', content: '这是公告2的内容', status: 0, createdTime: '2023-01-01 11:00', updatedTime: '2023-01-02 13:00' }
        ];
      }
    },
    mounted() {
      this.searchNotice();
    }
  };
  </script>
  
  <style scoped>
  .notice-management-container {
    padding: 20px;
  }
  
  .dialog-footer {
    text-align: right;
  }
  
  .el-form-item {
    margin-bottom: 10px;
  }
  
  .add-notice-btn {
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
  