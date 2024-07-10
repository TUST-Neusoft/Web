<template>
  <div class="area-management-container">
    <el-card>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="区域名称">
          <el-input v-model="search.areaName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchArea">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="openAddAreaDialog" class="add-area-btn">新增区域</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="areaList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="区域ID" width="100" align="center"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="200" align="center"></el-table-column>
        <el-table-column prop="areaType" label="区域类型" width="200" align="center">
          <template slot-scope="scope">
            <el-tag :type="getAreaTypeTag(scope.row.areaType)">{{ getAreaTypeLabel(scope.row.areaType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="parentAreaName" label="上级区域名称" width="200" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="300" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditAreaDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteArea(scope.row.id)">删除</el-button>
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

    <!-- 添加/编辑区域对话框 -->
    <el-dialog :title="areaDialog.title" :visible.sync="areaDialog.visible">
      <el-form :model="areaDialog.data" label-width="120px">
        <el-form-item label="上级区域" class="text-left">
          <el-cascader
            :options="areaOptions"
            v-model="areaDialog.data.parentId"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            placeholder="请选择上级区域">
          </el-cascader>
        </el-form-item>
        <el-form-item label="区域名称" class="text-left">
          <el-input v-model="areaDialog.data.areaName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="areaDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveArea">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        areaName: ''
      },
      areaList: [
        { id: 1, areaName: '大兴区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 2, areaName: '旧宫镇', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '大兴区' },
        { id: 3, areaName: '清源街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '旧宫镇' },
        { id: 4, areaName: '西城区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 5, areaName: '月坛街道', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '西城区' },
        { id: 6, areaName: '新街口街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '月坛街道' },
        { id: 7, areaName: '海淀区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 8, areaName: '中关村', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '海淀区' },
        { id: 9, areaName: '上地街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '中关村' },
        { id: 10, areaName: '丰台区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 11, areaName: '卢沟桥街道', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '丰台区' },
        { id: 12, areaName: '东大街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '卢沟桥街道' }
      ],
      total: 12,
      pageSize: 10,
      areaDialog: {
        title: '新增区域',
        visible: false,
        data: {}
      },
      areaOptions: [
        {
          value: 1,
          label: '大兴区',
          children: [
            { value: 2, label: '旧宫镇', children: [{ value: 3, label: '清源街道' }] }
          ]
        },
        {
          value: 4,
          label: '西城区',
          children: [
            { value: 5, label: '月坛街道', children: [{ value: 6, label: '新街口街道' }] }
          ]
        },
        {
          value: 7,
          label: '海淀区',
          children: [
            { value: 8, label: '中关村', children: [{ value: 9, label: '上地街道' }] }
          ]
        },
        {
          value: 10,
          label: '丰台区',
          children: [
            { value: 11, label: '卢沟桥街道', children: [{ value: 12, label: '东大街道' }] }
          ]
        }
      ]
    };
  },
  methods: {
    searchArea() {
      this.areaList = this.mockAreas().filter(area => area.areaName.includes(this.search.areaName));
      this.total = this.areaList.length;
    },
    resetSearch() {
      this.search.areaName = '';
      this.searchArea();
    },
    handlePageChange(page) {
      // 处理页码变化
    },
    openAddAreaDialog() {
      this.areaDialog.title = '新增区域';
      this.areaDialog.data = { areaName: '', parentId: [] };
      this.areaDialog.visible = true;
    },
    openEditAreaDialog(area) {
      this.areaDialog.title = '编辑区域';
      this.areaDialog.data = { ...area, parentId: this.getParentIds(area.id) };
      this.areaDialog.visible = true;
    },
    saveArea() {
      const areaData = this.areaDialog.data;
      const parentArea = this.areaOptions.find(option => option.value === areaData.parentId[0]);
      if (areaData.parentId.length === 0) {
        areaData.areaType = 0;
        areaData.parentAreaName = '';
      } else if (areaData.parentId.length === 1) {
        areaData.areaType = 1;
        areaData.parentAreaName = parentArea.label;
      } else if (areaData.parentId.length === 2) {
        areaData.areaType = 2;
        areaData.parentAreaName = parentArea.children.find(child => child.value === areaData.parentId[1]).label;
      }

      if (areaData.id) {
        const index = this.areaList.findIndex(item => item.id === areaData.id);
        if (index !== -1) {
          this.$set(this.areaList, index, { ...areaData, updateTime: this.formatDate(new Date()) });
        }
      } else {
        areaData.createTime = this.formatDate(new Date());
        areaData.updateTime = this.formatDate(new Date());
        areaData.id = this.areaList.length + 1;
        this.areaList.push(areaData);
      }
      this.areaDialog.visible = false;
      this.total = this.areaList.length;
    },
    deleteArea(areaId) {
      this.areaList = this.areaList.filter(area => area.id !== areaId);
      this.total = this.areaList.length;
    },
    getAreaTypeLabel(type) {
      const types = { 1: '一级区域', 2: '二级区域', 3: '三级区域' };
      return types[type] || '未知';
    },
    getAreaTypeTag(type) {
      const types = { 1: 'primary', 2: 'success', 3: 'warning' };
      return types[type] || 'info';
    },
    getParentIds(areaId) {
      if (areaId === 2) return [1];
      if (areaId === 3) return [1, 2];
      if (areaId === 5) return [4];
      if (areaId === 6) return [4, 5];
      if (areaId === 8) return [7];
      if (areaId === 9) return [7, 8];
      if (areaId === 11) return [10];
      if (areaId === 12) return [10, 11];
      return [];
    },
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    },
    mockAreas() {
      return [
        { id: 1, areaName: '大兴区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 2, areaName: '旧宫镇', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '大兴区' },
        { id: 3, areaName: '清源街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '旧宫镇' },
        { id: 4, areaName: '西城区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 5, areaName: '月坛街道', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '西城区' },
        { id: 6, areaName: '新街口街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '月坛街道' },
        { id: 7, areaName: '海淀区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 8, areaName: '中关村', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '海淀区' },
        { id: 9, areaName: '上地街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '中关村' },
        { id: 10, areaName: '丰台区', areaType: 1, createTime: '2023-01-01 10:00', updateTime: '2023-01-02 12:00', parentAreaName: '' },
        { id: 11, areaName: '卢沟桥街道', areaType: 2, createTime: '2023-01-01 11:00', updateTime: '2023-01-02 13:00', parentAreaName: '丰台区' },
        { id: 12, areaName: '东大街道', areaType: 3, createTime: '2023-01-01 12:00', updateTime: '2023-01-02 14:00', parentAreaName: '卢沟桥街道' }
      ];
    }
  },
  mounted() {
    this.searchArea();
  }
};
</script>

<style scoped>
.area-management-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-form-item {
  margin-bottom: 10px;
  text-align: left;
}

.add-area-btn {
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
  text-align: left;
}

.el-dialog__body {
  text-align: left;
}

.custom-table .el-table__header,
.custom-table .el-table__body {
  background-color: #f5f5f5;
}
</style>
