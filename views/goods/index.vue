<template>
  <div>
    <div class="price-select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline"
        style="margin-left: 20px;align-items: center;">
        <!-- 第一个输入框 -->
        <el-form-item label="价格区间:">
          <el-input v-model="formInline.lowprice" placeholder="最低价格"></el-input>
        </el-form-item>
        <!-- 第二个输入框 -->
        <el-form-item label="-">
          <el-input v-model="formInline.highprice" placeholder="最高价格"></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>
      <div class="horizontal-controls">
        <span>筛选排序:</span>
        <div class="sort-control" @click="toggleSort('price')">
          <span>价格</span>
          <div class="icon-container" :class="{ 'active': activeSort === 'price' }">
            <i class="el-icon-caret-top" :class="{ 'active': activeSort === 'price' && sortDirection === 'asc' }"></i>
            <i class="el-icon-caret-bottom"
              :class="{ 'active': activeSort === 'price' && sortDirection === 'desc' }"></i>
          </div>
        </div>
        <div class="sort-control" @click="toggleSort('sales')">
          <span>销量</span>
          <div class="icon-container" :class="{ 'active': activeSort === 'sales' }">
            <i class="el-icon-caret-top" :class="{ 'active': activeSort === 'sales' && sortDirection === 'asc' }"></i>
            <i class="el-icon-caret-bottom"
              :class="{ 'active': activeSort === 'sales' && sortDirection === 'desc' }"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="classes-container"@click="goToDetail()">
        <classes v-for="(item, index) in displayedClasses" :key="index" :imageUrl="item.imagePath"
          :title="item.productTitle" :description="item.productDescription" :price="item.productPrice"
          :sales="item.productsales">
        </classes>
      </div>
    </div>
    <div class="block" style="margin-top: 60px;margin-left: 250px;margin-right: 250px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4, 5]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="filteredClass01.length">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>
.price-select {
  padding-top: 20px;
  margin-left: 250px;
  margin-right: 250px;
  margin-top: 50px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #DCDFE6;
}

/* 覆盖Element UI的默认样式 */
.demo-form-inline .el-form-item {
  margin-bottom: 0;
}

.container {
  display: flex;
  justify-content: center;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 60px;
  /* 水平居中 */
}

.classes-container {
  display: flex;
  flex-wrap: nowrap;
  /* 确保子元素不换行 */
  align-content: center;
  gap: 50px;
  /* 添加间距 */
}

.custom-card {
  width: 300px;
  /* 自定义卡片宽度 */
  height: auto;
  /* 自定义卡片高度，根据内容自适应 */
}

.custom-border {
  border: 1px solid #DCDFE6;
  /* 黑色实线边框 */
}

.horizontal-controls {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  white-space: nowrap;
  /* 防止元素换行 */
  margin-left: 20px;
  padding-top: 2px;
  padding-bottom: 22px;
  gap: 50px;
}

.horizontal-controls span:first-child {
  /* 为第一个span添加一些样式，如果需要的话 */
  margin-right: 10px;
  /* 与后面控件的间隔 */
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}

.sort-control {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
}

.icon-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列图标 */
  margin-left: 5px;
  /* 与文本的间隔 */
}

/* 将排序图标的默认颜色设置为灰色或其他颜色 */
.icon-container i {
  color: #ccc;
  /* 默认颜色 */
  margin: -4px 0;
}

/* 当排序图标处于活动状态时，设置为 #1890ff */
.icon-container i.active {
  color: #1890ff;
}

/* 根据当前的排序方向，设置对应的图标为活动状态 */
.sort-control .el-icon-caret-top.active {
  color: #1890ff;
  /* 升序时上三角图标颜色 */
}

.sort-control .el-icon-caret-bottom.active {
  color: #1890ff;
  /* 降序时下三角图标颜色 */
}
</style>
<script>
import classes from './components/classes'
export default {
  name: 'index',
  components: { classes },
  data() {
    return {
      tableData: [
      ],
      filteredClass01: [], // 用于存储过滤后的卡片列表
      activeSort: null, // 当前选中的排序类型（'price' 或 'sales'）
      sortDirection: 'asc', // 默认排序方向
      currentPage: 1,
      pageSize: 4,
      formInline: {
        lowprice: '',
        highprice: ''
      },
      options: [{
        value: '选项1',
        label: '1条/页'
      }, {
        value: '选项2',
        label: '2条/页'
      }, {
        value: '选项3',
        label: '3条/页'
      }, {
        value: '选项4',
        label: '4条/页'
      }, {
        value: '选项5',
        label: '5条/页'
      }],
      value: '',
      class01: [
        {
          imagePath: require('@/assets/404_images/milk02.jpg'), // 确保这是正确的图片路径
          productTitle: '精选牧场一号',
          productDescription: '产品描述01',
          productPrice: '100.5',
          productsales: '10'
        },
        // 如果需要，可以继续添加更多对象
        {
          imagePath: require('@/assets/404_images/R.jpg'), // 确保这是正确的图片路径
          productTitle: '纯牛奶一号',
          productDescription: '产品描述02',
          productPrice: '216.8',
          productsales: '2'
        },
        {
          imagePath: require('@/assets/404_images/milk02.jpg'), // 确保这是正确的图片路径
          productTitle: '精选牧场二号',
          productDescription: '产品描述03',
          productPrice: '375.0',
          productsales: '6'
        },
        {
          imagePath: require('@/assets/404_images/R.jpg'), // 确保这是正确的图片路径
          productTitle: '纯牛奶二号',
          productDescription: '产品描述04',
          productPrice: '260.8',
          productsales: '8'
        },
        {
          imagePath: require('@/assets/404_images/R.jpg'), // 确保这是正确的图片路径
          productTitle: '纯牛奶三号',
          productDescription: '产品描述05',
          productPrice: '216.8',
          productsales: '2'
        },
      ]
    };
  },
  created() {
    this.filteredClass01 = JSON.parse(JSON.stringify(this.class01)); // 初始化过滤列表为所有卡片
  },
  computed: {
    displayedClasses() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredClass01.slice(startIndex, startIndex + this.pageSize);
    },
  },
  methods: {
    onSubmit() {
      let lowPrice = parseFloat(this.formInline.lowprice);
      let highPrice = parseFloat(this.formInline.highprice);

      // 过滤 class01 数组
      this.filteredClass01 = this.class01.filter(item => {
        return (isNaN(lowPrice) || item.productPrice >= lowPrice) &&
          (isNaN(highPrice) || item.productPrice <= highPrice);
      });

      // 重置分页到第一页
      this.currentPage = 1;
    },

    // 这里可以添加提交表单的逻辑
    handleSizeChange(val) {
      this.pageSize = val; // 更新每页显示条数
      this.currentPage = 1; // 每次修改每页显示条数时，重置当前页为第一页
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val; // 更新当前页
      console.log(`当前页: ${val}`);
    },
    toggleSort(sortType) {
      if (this.activeSort !== sortType) {
        this.activeSort = sortType;
        this.sortDirection = 'asc';
      } else {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }

      this.filteredClass01.sort((a, b) => {
        if (sortType === 'price') {
          return this.sortDirection === 'asc'
            ? parseFloat(a.productPrice) - parseFloat(b.productPrice)
            : parseFloat(b.productPrice) - parseFloat(a.productPrice);
        } else if (sortType === 'sales') {
          return this.sortDirection === 'asc'
            ? parseInt(a.productsales, 10) - parseInt(b.productsales, 10)
            : parseInt(b.productsales, 10) - parseInt(a.productsales, 10);
        }
      });

      // 重置分页到第一页
      this.currentPage = 1;
    }, 
    goToDetail() {
      this.$router.push({ name: 'Detail' });
    },
  }
}
</script>