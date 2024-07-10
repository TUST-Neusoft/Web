<template>
  <div class="store-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="门店名称">
          <el-input v-model="search.storeName" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchStore">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddStoreDialog" class="add-store-btn">新增门店</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="storeList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="id" label="门店ID" width="75"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="90"></el-table-column>
        <el-table-column prop="storeName" label="门店名称" width="90"></el-table-column>
        <el-table-column prop="address" label="详细地址" width="150"></el-table-column>
        <el-table-column prop="location" label="门店位置" width="150">
          <template slot-scope="scope">
            {{ scope.row.latitude }}, {{ scope.row.longitude }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="门店介绍" width="200"></el-table-column>
        <el-table-column prop="status" label="营业状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '营业中' ? 'success' : 'danger'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startBusinessTime" label="开始营业时间" width="200"></el-table-column>
        <el-table-column prop="stopBusinessTime" label="停止营业时间" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditStoreDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteStore(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" @click="openGoodsListDialog(scope.row)">商品列表</el-button>
            <el-button size="mini" type="primary" @click="openAddGoodsDialog(scope.row)">添加商品</el-button>
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

    <!-- 添加/编辑门店对话框 -->
    <el-dialog :title="storeDialog.title" :visible.sync="storeDialog.visible">
      <el-form :model="storeDialog.data" label-width="120px">
        <el-form-item label="门店名称">
          <el-input v-model="storeDialog.data.storeName"></el-input>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-cascader
            :options="areaOptions"
            v-model="storeDialog.data.areaId"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            placeholder="请选择所属区域">
          </el-cascader>
        </el-form-item>
        <el-form-item label="门店详细地址">
          <el-input v-model="storeDialog.data.address"></el-input>
        </el-form-item>
        <el-form-item label="门店经纬度">
          <el-button @click="openMapDialog">选择地址</el-button>
          <div>{{ storeDialog.data.latitude }}, {{ storeDialog.data.longitude }}</div>
        </el-form-item>
        <el-form-item label="门店介绍">
          <el-input type="textarea" v-model="storeDialog.data.description"></el-input>
        </el-form-item>
        <el-form-item label="营业状态">
          <el-radio-group v-model="storeDialog.data.status">
            <el-radio label="营业中">营业中</el-radio>
            <el-radio label="停业">停业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始营业时间">
          <el-date-picker v-model="storeDialog.data.startBusinessTime" type="datetime" placeholder="选择开始营业时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="停止营业时间">
          <el-date-picker v-model="storeDialog.data.stopBusinessTime" type="datetime" placeholder="选择停止营业时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="storeDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveStore">确定</el-button>
      </div>
    </el-dialog>

    <!-- 地图选择对话框 -->
    <el-dialog title="地图" :visible.sync="mapDialog.visible" width="50%">
      <div id="map" style="height: 400px;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="selectLocation">确定</el-button>
      </div>
    </el-dialog>

    <!-- 商品列表对话框 -->
    <el-dialog :title="goodsListDialog.title" :visible.sync="goodsListDialog.visible" width="60%">
      <el-table :data="goodsListDialog.data" style="width: 100%" class="custom-table">
        <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="150"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditGoodsDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteGoods(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="goodsTotal"
        :page-size="goodsPageSize"
        @current-change="handleGoodsPageChange">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsListDialog.visible = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 编辑商品对话框 -->
    <el-dialog :title="editGoodsDialog.title" :visible.sync="editGoodsDialog.visible">
      <el-form :model="editGoodsDialog.data" label-width="120px">
        <el-form-item label="商品价格">
          <el-input v-model="editGoodsDialog.data.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="editGoodsDialog.data.stock"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editGoodsDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveGoods">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加商品对话框 -->
    <el-dialog :title="addGoodsDialog.title" :visible.sync="addGoodsDialog.visible" width="60%">
      <el-form :model="addGoodsDialog.data" label-width="120px">
        <el-form-item label="商品关键字">
          <el-input v-model="addGoodsDialog.searchKeyword" @input="searchGoods"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader
            :options="categoryOptions"
            v-model="addGoodsDialog.searchCategory"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="searchGoods"
            placeholder="请选择类别">
          </el-cascader>
        </el-form-item>
      </el-form>
      <el-table :data="addGoodsDialog.goodsList" style="width: 100%" class="custom-table">
        <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="150"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="openAddGoodsForm(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodsDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="addGoods">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加商品表单对话框 -->
    <el-dialog :title="addGoodsFormDialog.title" :visible.sync="addGoodsFormDialog.visible">
      <el-form :model="addGoodsFormDialog.data" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="addGoodsFormDialog.data.goodsName" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="addGoodsFormDialog.data.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="addGoodsFormDialog.data.stock"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodsFormDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddGoods">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        storeName: ''
      },
      storeList: [
        // 示例数据
        { id: 1, areaName: '北京市', storeName: '旗舰店', address: '北京市朝阳区', latitude: '39.9042', longitude: '116.4074', description: '北京市旗舰店', status: '营业中', startBusinessTime: '2023-01-01 08:00', stopBusinessTime: '2023-01-01 22:00', createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00' },
        { id: 2, areaName: '上海市', storeName: '分店1', address: '上海市浦东新区', latitude: '31.2304', longitude: '121.4737', description: '上海市分店1', status: '停业', startBusinessTime: '2023-01-01 09:00', stopBusinessTime: '2023-01-01 21:00', createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00' }
      ],
      total: 2,
      pageSize: 10,
      storeDialog: {
        title: '新增门店',
        visible: false,
        data: {}
      },
      mapDialog: {
        visible: false,
        selectedLocation: {}
      },
      goodsListDialog: {
        title: '商品列表',
        visible: false,
        data: [],
        pageSize: 5,  // 商品列表分页大小
        currentPage: 1  // 商品列表当前页
      },
      goodsTotal: 0, // 商品总数
      goodsPageSize: 5, // 每页商品数
      editGoodsDialog: {
        title: '编辑商品',
        visible: false,
        data: {}
      },
      addGoodsDialog: {
        title: '添加商品',
        visible: false,
        searchKeyword: '',
        searchCategory: [],
        goodsList: []
      },
      addGoodsFormDialog: {
        title: '添加商品',
        visible: false,
        data: {}
      },
      areaOptions: [
        {
          value: 1,
          label: '北京市',
          children: [
            { value: 2, label: '朝阳区' },
            { value: 3, label: '海淀区' }
          ]
        },
        {
          value: 4,
          label: '上海市',
          children: [
            { value: 5, label: '浦东新区' },
            { value: 6, label: '徐汇区' }
          ]
        }
      ],
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
      ]
    };
  },
  methods: {
    searchStore() {
      // 调用接口搜索门店，演示数据直接返回
      this.storeList = this.mockStores().filter(store => store.storeName.includes(this.search.storeName));
      this.total = this.storeList.length;
    },
    resetSearch() {
      this.search.storeName = '';
      this.searchStore();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddStoreDialog() {
      this.storeDialog.title = '新增门店';
      this.storeDialog.data = { storeName: '', areaId: [], address: '', latitude: '', longitude: '', description: '', status: '营业中', startBusinessTime: '', stopBusinessTime: '' };
      this.storeDialog.visible = true;
    },
    openEditStoreDialog(store) {
      this.storeDialog.title = '编辑门店';
      this.storeDialog.data = { ...store, areaId: this.getAreaIds(store.areaName) };
      this.storeDialog.visible = true;
    },
    saveStore() {
      // 保存门店信息的逻辑
      const storeData = { ...this.storeDialog.data };
      storeData.areaName = this.getAreaName(storeData.areaId);
      if (storeData.id) {
        const index = this.storeList.findIndex(item => item.id === storeData.id);
        if (index !== -1) {
          this.$set(this.storeList, index, { ...storeData, updateTime: this.formatDate(new Date()) });
        }
      } else {
        storeData.createTime = this.formatDate(new Date());
        storeData.updateTime = this.formatDate(new Date());
        storeData.id = this.storeList.length + 1;
        this.storeList.push(storeData);
      }
      this.storeDialog.visible = false;
      this.total = this.storeList.length;
    },
    deleteStore(storeId) {
      // 删除门店的逻辑
      this.storeList = this.storeList.filter(store => store.id !== storeId);
      this.total = this.storeList.length;
    },
    openMapDialog() {
      this.mapDialog.visible = true;
      this.initMap();
    },
    selectLocation() {
      // 选取位置的逻辑
      this.storeDialog.data.latitude = this.mapDialog.selectedLocation.lat;
      this.storeDialog.data.longitude = this.mapDialog.selectedLocation.lng;
      this.mapDialog.visible = false;
    },
    initMap() {
      // 初始化地图的逻辑，假设使用高德地图
      const map = new AMap.Map('map', {
        zoom: 10,
        center: [116.397428, 39.90923] // 默认中心点
      });
      map.on('click', (e) => {
        this.mapDialog.selectedLocation = { lat: e.lnglat.lat, lng: e.lnglat.lng };
      });
    },
    openGoodsListDialog(store) {
      this.goodsListDialog.title = `商品列表 - ${store.storeName}`;
      this.goodsListDialog.data = this.mockGoodsList();
      this.goodsTotal = this.goodsListDialog.data.length;
      this.goodsListDialog.visible = true;
    },
    handleGoodsPageChange(page) {
      this.goodsListDialog.currentPage = page;
      this.fetchGoodsData();
    },
    fetchGoodsData() {
      // 模拟从服务器获取分页数据
      const start = (this.goodsListDialog.currentPage - 1) * this.goodsPageSize;
      const end = start + this.goodsPageSize;
      this.goodsListDialog.data = this.mockGoodsList().slice(start, end);
    },
    openEditGoodsDialog(goods) {
      this.editGoodsDialog.title = `编辑商品 - ${goods.goodsName}`;
      this.editGoodsDialog.data = { ...goods };
      this.editGoodsDialog.visible = true;
    },
    saveGoods() {
      // 保存商品信息的逻辑
      const goodsData = this.editGoodsDialog.data;
      const index = this.goodsListDialog.data.findIndex(item => item.id === goodsData.id);
      if (index !== -1) {
        this.$set(this.goodsListDialog.data, index, { ...goodsData });
      }
      this.editGoodsDialog.visible = false;
    },
    openAddGoodsDialog(store) {
      this.addGoodsDialog.title = `添加商品 - ${store.storeName}`;
      this.addGoodsDialog.visible = true;
    },
    searchGoods() {
      // 模拟搜索商品的逻辑
      const keyword = this.addGoodsDialog.searchKeyword;
      const categoryId = this.addGoodsDialog.searchCategory[0];
      this.addGoodsDialog.goodsList = this.mockGoodsList().filter(goods =>
        goods.goodsName.includes(keyword) &&
        (!categoryId || goods.categoryId === categoryId)
      );
    },
    openAddGoodsForm(goods) {
      this.addGoodsFormDialog.title = `添加商品 - ${goods.goodsName}`;
      this.addGoodsFormDialog.data = { ...goods, price: '', stock: '' };
      this.addGoodsFormDialog.visible = true;
    },
    confirmAddGoods() {
      const goodsData = this.addGoodsFormDialog.data;
      this.goodsListDialog.data.push({ ...goodsData });
      this.addGoodsFormDialog.visible = false;
    },
    mockStores() {
      return [
        { id: 1, areaName: '北京市', storeName: '旗舰店', address: '北京市朝阳区', latitude: '39.9042', longitude: '116.4074', description: '北京市旗舰店', status: '营业中', startBusinessTime: '2023-01-01 08:00', stopBusinessTime: '2023-01-01 22:00', createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00' },
        { id: 2, areaName: '上海市', storeName: '分店1', address: '上海市浦东新区', latitude: '31.2304', longitude: '121.4737', description: '上海市分店1', status: '停业', startBusinessTime: '2023-01-01 09:00', stopBusinessTime: '2023-01-01 21:00', createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00' }
      ];
    },
    mockGoodsList() {
      return [
        { id: 1, goodsName: '商品1', categoryId: 1, categoryName: '类别1', price: 100, stock: 50 },
        { id: 2, goodsName: '商品2', categoryId: 2, categoryName: '类别2', price: 200, stock: 30 }
      ];
    },
    getAreaIds(areaName) {
      // 模拟获取区域ID数组
      if (areaName === '北京市') return [1];
      if (areaName === '上海市') return [4];
      return [];
    },
    getAreaName(areaId) {
      const area = this.areaOptions.find(area => area.value === areaId[0]);
      if (!area) return '';
      if (areaId.length === 1) return area.label;
      const subArea = area.children.find(sub => sub.value === areaId[1]);
      return subArea ? `${area.label}/${subArea.label}` : area.label;
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    }
  },
  mounted() {
    this.searchStore();
  }
};
</script>

<style scoped>
.store-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
  text-align: left;
}

.add-store-btn {
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
