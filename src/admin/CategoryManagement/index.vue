<template>
  <div class="category-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="类别名称">
          <el-input v-model="search.categoryName" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCategory">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddCategoryDialog" class="add-category-btn">新增类别</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="categoryList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="类别ID" width="100" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="200" align="center"></el-table-column>
        <el-table-column prop="categoryType" label="类别类型" width="200" align="center">
          <template slot-scope="scope">
            <el-tag :type="getCategoryTypeTag(scope.row.categoryType)">{{ getCategoryTypeLabel(scope.row.categoryType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="300" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditCategoryDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteCategory(scope.row.id)">删除</el-button>
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

    <!-- 添加/编辑类别对话框 -->
    <el-dialog :title="categoryDialog.title" :visible.sync="categoryDialog.visible">
      <el-form :model="categoryDialog.data" label-width="120px">
        <el-form-item label="上级类别" class="text-left">
          <el-cascader
            :options="categoryOptions"
            v-model="categoryDialog.data.parentId"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            placeholder="请选择上级类别">
          </el-cascader>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="categoryDialog.data.categoryName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveCategory">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        categoryName: ''
      },
      categoryList: [
        { id: 1, categoryName: '电子产品', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 2, categoryName: '手机', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 1 },
        { id: 3, categoryName: '学习装备', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 4, categoryName: '营养膳食', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 5, categoryName: '学习攻坚', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 6, categoryName: '教师培训', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 7, categoryName: '健康五谷', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 8, categoryName: '精选生活', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 }
      ],
      total: 8,
      pageSize: 10,
      categoryDialog: {
        title: '新增类别',
        visible: false,
        data: {}
      },
      categoryOptions: [
        {
          value: 1,
          label: '电子产品',
          children: [
            { value: 2, label: '手机' },
            { value: 12, label: '笔记本电脑' },
            { value: 13, label: '平板电脑' }
          ]
        },
        {
          value: 3,
          label: '学习装备',
          children: [
            { value: 14, label: '书包' },
            { value: 15, label: '文具' },
            { value: 16, label: '学习机' }
          ]
        },
        {
          value: 4,
          label: '营养膳食',
          children: [
            { value: 17, label: '营养早餐' },
            { value: 18, label: '健康零食' },
            { value: 19, label: '保健品' }
          ]
        },
        {
          value: 5,
          label: '学习攻坚',
          children: []
        },
        {
          value: 6,
          label: '教师培训',
          children: []
        },
        {
          value: 7,
          label: '健康五谷',
          children: [
            { value: 9, label: '糙米' }
          ]
        },
        {
          value: 8,
          label: '精选生活',
          children: [
            { value: 10, label: '啤酒' },
            { value: 11, label: '饮料' }
          ]
        }
      ]
    };
  },
  methods: {
    searchCategory() {
      // 调用接口搜索类别，演示数据直接返回
      this.categoryList = this.mockCategories().filter(category => category.categoryName.includes(this.search.categoryName));
      this.total = this.categoryList.length;
    },
    resetSearch() {
      this.search.categoryName = '';
      this.searchCategory();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddCategoryDialog() {
      this.categoryDialog.title = '新增类别';
      this.categoryDialog.data = { categoryName: '', parentId: [] };
      this.categoryDialog.visible = true;
    },
    openEditCategoryDialog(category) {
      this.categoryDialog.title = '编辑类别';
      this.categoryDialog.data = { ...category, parentId: this.getParentIds(category.id) };
      this.categoryDialog.visible = true;
    },
    saveCategory() {
      // 保存类别信息的逻辑
      const categoryData = this.categoryDialog.data;
      if (categoryData.id) {
        const index = this.categoryList.findIndex(item => item.id === categoryData.id);
        if (index !== -1) {
          this.$set(this.categoryList, index, { ...categoryData, updateTime: this.formatDate(new Date()), categoryType: categoryData.parentId.length ? 2 : 1 });
        }
      } else {
        categoryData.createTime = this.formatDate(new Date());
        categoryData.updateTime = this.formatDate(new Date());
        categoryData.id = this.categoryList.length + 1;
        categoryData.categoryType = categoryData.parentId.length ? 2 : 1;
        this.categoryList.push(categoryData);
      }
      this.categoryDialog.visible = false;
      this.total = this.categoryList.length; // 更新 total
    },
    deleteCategory(categoryId) {
      // 删除类别的逻辑
      this.categoryList = this.categoryList.filter(category => category.id !== categoryId);
      this.total = this.categoryList.length;
    },
    getCategoryTypeLabel(type) {
      const types = { 1: '一级类别', 2: '二级类别', 3: '三级类别' };
      return types[type] || '未知';
    },
    getCategoryTypeTag(type) {
      const types = { 1: 'primary', 2: 'success', 3: 'warning' };
      return types[type] || 'info';
    },
    getParentIds(categoryId) {
      // 模拟获取父级ID数组
      const category = this.mockCategories().find(cat => cat.id === categoryId);
      return category ? [category.parentId] : [];
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockCategories() {
      return [
        { id: 1, categoryName: '电子产品', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 2, categoryName: '手机', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 1 },
        { id: 3, categoryName: '学习装备', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 4, categoryName: '笔记本电脑', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 1 },
        { id: 5, categoryName: '平板电脑', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 1 },
        { id: 6, categoryName: '营养膳食', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 7, categoryName: '健康五谷', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 8, categoryName: '糙米', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 7 },
        { id: 9, categoryName: '精选生活', categoryType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 0 },
        { id: 10, categoryName: '啤酒', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 9 },
        { id: 11, categoryName: '饮料', categoryType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentId: 9 },
        { id: 12, categoryName: '笔记本电脑', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 1 },
        { id: 13, categoryName: '平板电脑', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 1 },
        { id: 14, categoryName: '书包', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 3 },
        { id: 15, categoryName: '文具', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 3 },
        { id: 16, categoryName: '学习机', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 3 },
        { id: 17, categoryName: '营养早餐', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 4 },
        { id: 18, categoryName: '健康零食', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 4 },
        { id: 19, categoryName: '保健品', categoryType: 2, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentId: 4 }
      ];
    }
  },
  mounted() {
    this.searchCategory();
  }
};
</script>

<style scoped>
.category-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
}

.add-category-btn {
  margin-left: 10px;
}

.el-table th, .el-table td {
  text-align: center !important;
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

.el-dialog__body {
  text-align: left;
}
</style>
