<template>
  <div class="product-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="search.productName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="search.categoryName" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchProduct">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddProductDialog" class="add-product-btn">新增商品</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="productList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="150"></el-table-column>
        <el-table-column prop="description" label="商品介绍" width="200"></el-table-column>
        <el-table-column prop="detailedDescription" label="商品详细说明" width="200"></el-table-column>
        <el-table-column prop="price" label="市场价格" width="150"></el-table-column>
        <el-table-column prop="status" label="商品状态" width="150">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '上架' : '下架' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditProductDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteProduct(scope.row.id)">删除</el-button>
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

    <!-- 添加/编辑商品对话框 -->
    <el-dialog :title="productDialog.title" :visible.sync="productDialog.visible">
      <el-form :model="productDialog.data" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="productDialog.data.productName"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-cascader
            :options="categoryOptions"
            v-model="productDialog.data.categoryId"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            placeholder="请选择类别">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品图片">
          <div class="image-uploader">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <div class="image-preview">
                <img v-if="productDialog.data.imageUrl" :src="productDialog.data.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input v-model="productDialog.data.description"></el-input>
        </el-form-item>
        <el-form-item label="商品详细说明">
          <quill-editor v-model="productDialog.data.detailedDescription" :options="editorOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="productDialog.data.price"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-radio-group v-model="productDialog.data.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      search: {
        productName: '',
        categoryName: ''
      },
      productList: [
        // 示例数据
        { id: 1, productName: 'iPhone 13', categoryName: '电子产品/手机', description: '最新款iPhone 13', detailedDescription: '最新款iPhone 13，配备A15芯片', price: 6999, status: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00' },
        { id: 2, productName: 'MacBook Pro', categoryName: '电子产品/笔记本', description: '最新款MacBook Pro', detailedDescription: '最新款MacBook Pro，配备M1芯片', price: 12999, status: 1, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00' },
        { id: 3, productName: '营养膳食套餐', categoryName: '营养膳食', description: '营养丰富的膳食套餐', detailedDescription: '营养丰富的膳食套餐，适合各类人群', price: 299, status: 1, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00' },
        { id: 4, productName: '健康五谷大米', categoryName: '健康五谷/大米', description: '健康五谷大米，健康营养', detailedDescription: '健康五谷大米，健康营养，适合各类人群', price: 49, status: 1, createTime: '2023-01-01 13:00', updateTime: '2023-01-02 15:00' }
      ],
      total: 4,
      pageSize: 10,
      productDialog: {
        title: '新增商品',
        visible: false,
        data: {}
      },
      categoryOptions: [
        // 示例类别数据
        {
          value: 1,
          label: '电子产品',
          children: [
            { value: 2, label: '手机' },
            { value: 3, label: '笔记本' }
          ]
        },
        {
          value: 4,
          label: '营养膳食',
          children: []
        },
        {
          value: 5,
          label: '健康五谷',
          children: [
            { value: 6, label: '大米' }
          ]
        }
      ],
      editorOptions: {
        theme: 'snow'
      }
    };
  },
  methods: {
    searchProduct() {
      // 调用接口搜索商品，演示数据直接返回
      this.productList = this.mockProducts().filter(product => product.productName.includes(this.search.productName) && product.categoryName.includes(this.search.categoryName));
      this.total = this.productList.length;
    },
    resetSearch() {
      this.search.productName = '';
      this.search.categoryName = '';
      this.searchProduct();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddProductDialog() {
      this.productDialog.title = '新增商品';
      this.productDialog.data = { productName: '', categoryId: [], imageUrl: '', description: '', detailedDescription: '', price: 0, status: 1 };
      this.productDialog.visible = true;
    },
    openEditProductDialog(product) {
      this.productDialog.title = '编辑商品';
      this.productDialog.data = { ...product, categoryId: this.getCategoryIds(product.categoryName) };
      this.productDialog.visible = true;
    },
    saveProduct() {
      // 保存商品信息的逻辑
      const productData = this.productDialog.data;
      productData.categoryName = this.getCategoryName(productData.categoryId);
      if (productData.id) {
        const index = this.productList.findIndex(item => item.id === productData.id);
        if (index !== -1) {
          this.$set(this.productList, index, { ...productData, updateTime: this.formatDate(new Date()) });
        }
      } else {
        productData.createTime = this.formatDate(new Date());
        productData.updateTime = this.formatDate(new Date());
        productData.id = this.productList.length + 1;
        this.productList.push(productData);
      }
      this.productDialog.visible = false;
    },
    deleteProduct(productId) {
      // 删除商品的逻辑
      this.productList = this.productList.filter(product => product.id !== productId);
      this.total = this.productList.length;
    },
    handleAvatarSuccess(res, file) {
      this.productDialog.data.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    getCategoryIds(categoryName) {
      // 模拟获取类别ID数组
      if (categoryName === '电子产品/手机') return [1, 2];
      if (categoryName === '电子产品/笔记本') return [1, 3];
      if (categoryName === '营养膳食') return [4];
      if (categoryName === '健康五谷/大米') return [5, 6];
      return [];
    },
    getCategoryName(categoryIds) {
      // 根据类别ID获取类别名称
      if (categoryIds.includes(2)) return '电子产品/手机';
      if (categoryIds.includes(3)) return '电子产品/笔记本';
      if (categoryIds.includes(4)) return '营养膳食';
      if (categoryIds.includes(6)) return '健康五谷/大米';
      return '未分类';
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockProducts() {
      return [
        { id: 1, productName: 'iPhone 13', categoryName: '电子产品/手机', description: '最新款iPhone 13', detailedDescription: '最新款iPhone 13，配备A15芯片', price: 6999, status: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00' },
        { id: 2, productName: 'MacBook Pro', categoryName: '电子产品/笔记本', description: '最新款MacBook Pro', detailedDescription: '最新款MacBook Pro，配备M1芯片', price: 12999, status: 1, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00' },
        { id: 3, productName: '营养膳食套餐', categoryName: '营养膳食', description: '营养丰富的膳食套餐', detailedDescription: '营养丰富的膳食套餐，适合各类人群', price: 299, status: 1, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00' },
        { id: 4, productName: '健康五谷大米', categoryName: '健康五谷/大米', description: '健康五谷大米，健康营养', detailedDescription: '健康五谷大米，健康营养，适合各类人群', price: 49, status: 1, createTime: '2023-01-01 13:00', updateTime: '2023-01-02 15:00' }
      ];
    }
  },
  mounted() {
    this.searchProduct();
  }
};
</script>

<style scoped>
.product-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
}

.add-product-btn {
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

.image-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.avatar-uploader .el-upload {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 178px;
}

.avatar-uploader .el-upload input {
  display: none;
}

.avatar-uploader .el-upload .avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.el-dialog__body {
  text-align: left;
}
</style>
