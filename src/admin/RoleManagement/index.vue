<template>
  <div class="role-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="search.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchRole">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddRoleDialog" class="add-role-btn">新增角色</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="roleList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="角色ID" width="80" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="150" align="center"></el-table-column>
        <el-table-column prop="description" label="角色描述" width="200" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="160" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="520" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditRoleDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" @click="openMenuPermissionDialog(scope.row)">菜单权限</el-button>
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

    <!-- 添加/编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="roleDialog.visible">
      <el-form :model="roleDialog.data">
        <el-form-item label="角色名称">
          <el-input v-model="roleDialog.data.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleDialog.data.description"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="roleDialog.data.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
      </div>
    </el-dialog>

    <!-- 菜单权限对话框 -->
    <el-dialog title="分配菜单权限" :visible.sync="menuPermissionDialog.visible" width="30%">
      <el-tree
        :data="menuTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="menuTreeProps"
        ref="menuTree">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuPermissionDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveMenuPermissions">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        roleName: ''
      },
      roleList: [
        { id: 1, roleName: 'admin', description: '超级管理员', status: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', permissions: [1, 2, 3, 4, 5, 6, 7] },
        { id: 2, roleName: 'editor', description: '编辑员', status: 1, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', permissions: [1] },
        { id: 3, roleName: 'viewer', description: '观察员', status: 0, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', permissions: [1] }
      ],
      total: 3,
      pageSize: 10,
      roleDialog: {
        visible: false,
        data: {}
      },
      menuPermissionDialog: {
        visible: false,
        role: {},
        checkedKeys: []
      },
      menuTree: [
        {
          id: 1,
          label: '首页',
          children: []
        },
        {
          id: 2,
          label: '权限管理',
          children: [
            { id: 3, label: '角色管理' },
            { id: 4, label: '用户管理' }
          ]
        },
        {
          id: 5,
          label: '商品管理',
          children: [
            { id: 6, label: '类别管理' },
            { id: 7, label: '商品管理' }
          ]
        }
        // 更多菜单数据
      ],
      menuTreeProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    searchRole() {
      // 调用接口搜索角色，演示数据直接返回
      this.roleList = this.mockRoles().filter(role => role.roleName.includes(this.search.roleName));
      this.total = this.roleList.length;
    },
    resetSearch() {
      this.search.roleName = '';
      this.searchRole();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddRoleDialog() {
      this.roleDialog.data = { roleName: '', description: '', status: 1, permissions: [1] }; // 默认只勾选首页权限
      this.roleDialog.visible = true;
    },
    openEditRoleDialog(role) {
      this.roleDialog.data = { ...role };
      this.roleDialog.visible = true;
    },
    saveRole() {
      // 保存角色信息的逻辑
      const existingRoleIndex = this.roleList.findIndex(role => role.id === this.roleDialog.data.id);
      if (existingRoleIndex !== -1) {
        this.$set(this.roleList, existingRoleIndex, { ...this.roleDialog.data, updateTime: this.formatDate(new Date()) });
      } else {
        this.roleDialog.data.createTime = this.formatDate(new Date());
        this.roleDialog.data.updateTime = this.formatDate(new Date());
        this.roleDialog.data.id = this.roleList.length + 1;
        this.roleList.push(this.roleDialog.data);
      }
      this.roleDialog.visible = false;
      this.total = this.roleList.length;
    },
    deleteRole(roleId) {
      // 删除角色的逻辑
      this.roleList = this.roleList.filter(role => role.id !== roleId);
      this.total = this.roleList.length;
    },
    openMenuPermissionDialog(role) {
      this.menuPermissionDialog.role = { ...role };
      this.menuPermissionDialog.checkedKeys = [...role.permissions]; // 深拷贝确保独立
      this.$nextTick(() => {
        this.$refs.menuTree.setCheckedKeys(this.menuPermissionDialog.checkedKeys);
      });
      this.menuPermissionDialog.visible = true;
    },
    saveMenuPermissions() {
      // 保存菜单权限的逻辑
      const checkedKeys = this.$refs.menuTree.getCheckedKeys();
      const roleIndex = this.roleList.findIndex(role => role.id === this.menuPermissionDialog.role.id);
      if (roleIndex !== -1) {
        this.$set(this.roleList[roleIndex], 'permissions', checkedKeys);
        this.$set(this.roleList[roleIndex], 'updateTime', this.formatDate(new Date()));
      }
      this.menuPermissionDialog.visible = false;
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockRoles() {
      return [
        { id: 1, roleName: 'admin', description: '超级管理员', status: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', permissions: [1, 2, 3, 4, 5, 6, 7] },
        { id: 2, roleName: 'editor', description: '编辑员', status: 1, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', permissions: [1] },
        { id: 3, roleName: 'viewer', description: '观察员', status: 0, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', permissions: [1] }
      ];
    }
  },
  mounted() {
    this.searchRole();
  }
};
</script>

<style scoped>
.role-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
}

.add-role-btn {
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
