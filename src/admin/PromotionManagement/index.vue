<template>
  <div class="promotion-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="模块名称">
          <el-input v-model="search.moduleName" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchModule">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddModuleDialog" class="add-module-btn">新增模块</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="moduleList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="模块ID" width="100"></el-table-column>
        <el-table-column prop="moduleName" label="模块名称" width="200"></el-table-column>
        <el-table-column prop="moduleStatus" label="模块状态" width="150">
          <template slot-scope="scope">
            <el-tag :type="getModuleStatusTag(scope.row.moduleStatus)">{{ getModuleStatusLabel(scope.row.moduleStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditModuleDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteModule(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" @click="openProductListDialog(scope.row)">商品列表</el-button>
            <el-button size="mini" type="primary" @click="openProductAddDialog(scope.row)">添加商品</el-button>
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

    <!-- 添加/编辑模块对话框 -->
    <el-dialog :title="moduleDialog.title" :visible.sync="moduleDialog.visible">
      <el-form :model="moduleDialog.data" label-width="120px">
        <el-form-item label="模块名称">
          <el-input v-model="moduleDialog.data.moduleName"></el-input>
        </el-form-item>
        <el-form-item label="模块状态">
          <el-select v-model="moduleDialog.data.moduleStatus" placeholder="请选择">
            <el-option label="正常" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="moduleDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveModule">确定</el-button>
      </div>
    </el-dialog>

    <!-- 商品列表对话框 -->
    <el-dialog title="模块商品管理" :visible.sync="productListDialog.visible" width="50%">
      <el-table :data="productListDialog.data" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="productImage" label="商品图片" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.productImage" style="width: 100px; height: 100px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productPrice" label="商品价格" width="150"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeProduct(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productListDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="productListDialog.visible = false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 商品添加对话框 -->
    <el-dialog title="商品添加" :visible.sync="productAddDialog.visible" width="60%">
      <el-form :inline="true" :model="productAddDialog.search" class="demo-form-inline">
        <el-form-item label="商品关键字">
          <el-input v-model="productAddDialog.search.productName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="productAddDialog.search.category" placeholder="请选择">
            <el-option label="类别1" :value="1"></el-option>
            <el-option label="类别2" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchProduct">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="productAddDialog.data" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="productImage" label="商品图片" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.productImage" style="width: 100px; height: 100px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productPrice" label="商品价格" width="150"></el-table-column>
        <el-table-column prop="productDescription" label="商品介绍" width="300"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="addProduct(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <span>已添加商品：{{ addedProducts.length }} 项</span>
        <el-table :data="addedProducts" style="width: 100%; margin-top: 10px;">
          <el-table-column prop="productIndex" label="序号" width="100"></el-table-column>
          <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
          <el-table-column prop="productImage" label="商品图片" width="200">
            <template slot-scope="scope">
              <el-image :src="scope.row.productImage" style="width: 50px; height: 50px"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="removeAddedProduct(scope.row.id)">移除商品</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productAddDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveAddedProducts">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        moduleName: ''
      },
      moduleList: [
        { id: 1, moduleName: '劳动节活动', moduleStatus: 1, createTime: '2023-04-27 15:16:53', updateTime: '2023-04-28 08:56:46' },
        { id: 2, moduleName: '五一活动', moduleStatus: 1, createTime: '2023-04-28 08:56:40', updateTime: '' }
      ],
      total: 2,
      pageSize: 10,
      moduleDialog: {
        title: '新增模块',
        visible: false,
        data: {}
      },
      productListDialog: {
        visible: false,
        data: []
      },
      productAddDialog: {
        visible: false,
        search: {
          productName: '',
          category: ''
        },
        data: []
      },
      addedProducts: []
    };
  },
  methods: {
    searchModule() {
      // 调用接口搜索模块，演示数据直接返回
      this.moduleList = this.mockModules().filter(module => module.moduleName.includes(this.search.moduleName));
      this.total = this.moduleList.length;
    },
    resetSearch() {
      this.search.moduleName = '';
      this.searchModule();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddModuleDialog() {
      this.moduleDialog.title = '新增模块';
      this.moduleDialog.data = { moduleName: '', moduleStatus: 1 };
      this.moduleDialog.visible = true;
    },
    openEditModuleDialog(module) {
      this.moduleDialog.title = '编辑模块';
      this.moduleDialog.data = { ...module };
      this.moduleDialog.visible = true;
    },
    saveModule() {
      const moduleData = this.moduleDialog.data;
      if (moduleData.id) {
        const index = this.moduleList.findIndex(item => item.id === moduleData.id);
        if (index !== -1) {
          this.$set(this.moduleList, index, { ...moduleData, updateTime: this.formatDate(new Date()) });
        }
      } else {
        moduleData.createTime = this.formatDate(new Date());
        moduleData.updateTime = this.formatDate(new Date());
        moduleData.id = this.moduleList.length + 1;
        this.moduleList.push(moduleData);
      }
      this.moduleDialog.visible = false;
    },
    deleteModule(moduleId) {
      this.moduleList = this.moduleList.filter(module => module.id !== moduleId);
      this.total = this.moduleList.length;
    },
    openProductListDialog(module) {
      this.productListDialog.data = this.mockProducts();
      this.productListDialog.visible = true;
    },
    removeProduct(productId) {
      this.productListDialog.data = this.productListDialog.data.filter(product => product.id !== productId);
    },
    openProductAddDialog() {
      this.productAddDialog.search = { productName: '', category: '' };
      this.productAddDialog.data = this.mockProducts();
      this.productAddDialog.visible = true;
    },
    searchProduct() {
      // 调用接口搜索商品，演示数据直接返回
      this.productAddDialog.data = this.mockProducts().filter(product => product.productName.includes(this.productAddDialog.search.productName));
    },
    addProduct(product) {
      if (!this.addedProducts.some(item => item.id === product.id)) {
        this.addedProducts.push({ ...product, productIndex: this.addedProducts.length + 1 });
      }
    },
    removeAddedProduct(productId) {
      this.addedProducts = this.addedProducts.filter(product => product.id !== productId);
    },
    saveAddedProducts() {
      this.productAddDialog.visible = false;
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockModules() {
      return [
        { id: 1, moduleName: '劳动节活动', moduleStatus: 1, createTime: '2023-04-27 15:16:53', updateTime: '2023-04-28 08:56:46' },
        { id: 2, moduleName: '五一活动', moduleStatus: 1, createTime: '2023-04-28 08:56:40', updateTime: '' }
      ];
    },
    mockProducts() {
      return [
        { id: 1, productName: '商品1', productImage: 'https://via.placeholder.com/100', productPrice: 100, productDescription: '这是商品1的描述' },
        { id: 2, productName: '商品2', productImage: 'https://via.placeholder.com/100', productPrice: 200, productDescription: '这是商品2的描述' }
      ];
    },
    getModuleStatusLabel(status) {
      const statuses = { 1: '正常', 0: '停用' };
      return statuses[status] || '未知';
    },
    getModuleStatusTag(status) {
      const statuses = { 1: 'success', 0: 'danger' };
      return statuses[status] || 'info';
    }
  },
  mounted() {
    this.searchModule();
  }
};
</script>

<style scoped>
.promotion-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
  text-align: left; /* 调整输入框位置 */
}

.add-module-btn {
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

.el-dialog__body {
  text-align: left; /* 调整输入框位置 */
}
</style>
