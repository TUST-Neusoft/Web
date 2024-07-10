<template>
    <div class="user-management-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="用户角色">
            <el-select v-model="search.role" placeholder="请选择角色">
              <el-option label="超级管理员" value="admin"></el-option>
              <el-option label="编辑员" value="editor"></el-option>
              <el-option label="观察员" value="viewer"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="search.userName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="search.phoneNumber" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchUser">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="头像" width="100" align="center">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户角色" width="180" align="center"></el-table-column>
          <el-table-column prop="role" label="用户姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="phoneNumber" label="手机号码" width="180" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
          <el-table-column prop="status" label="用户状态" width="180" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">{{ scope.row.status === 'active' ? '启用' : '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="上次登录时间" width="200" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="openEditRoleDialog(scope.row)">分配角色</el-button>
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
  
      <!-- 分配角色对话框 -->
      <el-dialog title="分配角色" :visible.sync="roleDialog.visible">
        <el-form :model="roleDialog.data">
          <el-form-item label="分配角色">
            <el-select v-model="roleDialog.data.role" placeholder="请选择角色">
              <el-option label="超级管理员" value="admin"></el-option>
              <el-option label="编辑员" value="editor"></el-option>
              <el-option label="观察员" value="viewer"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="saveRole">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          role: '',
          userName: '',
          phoneNumber: ''
        },
        userList: [
          { id: 1, avatar: 'https://via.placeholder.com/50', userName: 'admin', role: '超级管理员', phoneNumber: '18611111111', email: 'admin@example.com', status: 'active', lastLoginTime: '2024-07-04 14:09:00' },
          { id: 2, avatar: 'https://via.placeholder.com/50', userName: 'editor', role: '编辑员', phoneNumber: '18622222222', email: 'editor@example.com', status: 'active', lastLoginTime: '2024-07-04 14:09:00' }
        ],
        total: 2,
        pageSize: 10,
        roleDialog: {
          visible: false,
          data: {}
        }
      };
    },
    methods: {
      searchUser() {
        // 调用接口搜索用户，演示数据直接返回
        this.userList = this.mockUsers().filter(user => user.userName.includes(this.search.userName));
        this.total = this.userList.length;
      },
      resetSearch() {
        this.search.role = '';
        this.search.userName = '';
        this.search.phoneNumber = '';
        this.searchUser();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      openEditRoleDialog(user) {
        this.roleDialog.data = { ...user };
        this.roleDialog.visible = true;
      },
      saveRole() {
        // 保存角色信息的逻辑
        const user = this.userList.find(u => u.id === this.roleDialog.data.id);
        if (user) {
          user.role = this.roleDialog.data.role;
        }
        this.roleDialog.visible = false;
      },
      mockUsers() {
        return [
          { id: 1, avatar: 'https://via.placeholder.com/50', userName: 'admin', role: '超级管理员', phoneNumber: '18611111111', email: 'admin@example.com', status: 'active', lastLoginTime: '2024-07-04 14:09:00' },
          { id: 2, avatar: 'https://via.placeholder.com/50', userName: 'editor', role: '编辑员', phoneNumber: '18622222222', email: 'editor@example.com', status: 'active', lastLoginTime: '2024-07-04 14:09:00' }
        ];
      }
    },
    mounted() {
      this.searchUser();
    }
  };
  </script>
  
  <style scoped>
  .user-management-container {
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
  