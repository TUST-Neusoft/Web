<template>
    <div class="parking-management-container">
      <el-card>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="车位名称">
            <el-input v-model="search.parkingName" placeholder="请输入车位名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchParking">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="parkingList" style="width: 100%" @selection-change="handleSelectionChange" class="custom-table">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="车位ID" width="100"></el-table-column>
          <el-table-column prop="parkingName" label="车位名称" width="150"></el-table-column>
          <el-table-column prop="parkingType" label="车位类型" width="150">
            <template slot-scope="scope">
              <el-tag :type="getParkingTypeTag(scope.row.parkingType)">{{ getParkingTypeLabel(scope.row.parkingType) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isEnabled" label="启用状态" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isEnabled ? 'success' : 'danger'">{{ scope.row.isEnabled ? '启用' : '未启用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="plateNumber" label="绑定车牌号" width="200"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updatedTime" label="更新时间" width="200"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="handlePageChange">
        </el-pagination>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: {
          parkingName: ''
        },
        parkingList: [
          // 示例数据
          { id: 1, parkingName: '车位A1', parkingType: 'underground', isEnabled: true, plateNumber: '京A12345', createdTime: '2023-01-01 10:00', updatedTime: '2023-01-02 12:00' },
          { id: 2, parkingName: '车位B2', parkingType: 'ground', isEnabled: false, plateNumber: '京B67890', createdTime: '2023-01-01 11:00', updatedTime: '2023-01-02 13:00' },
          { id: 3, parkingName: '车位C3', parkingType: 'underground', isEnabled: true, plateNumber: '京C54321', createdTime: '2023-01-01 12:00', updatedTime: '2023-01-02 14:00' }
        ],
        total: 3,
        pageSize: 10
      };
    },
    methods: {
      searchParking() {
        // 调用接口搜索车位，演示数据直接返回
        this.parkingList = this.mockParkings().filter(parking => parking.parkingName.includes(this.search.parkingName));
        this.total = this.parkingList.length;
      },
      resetSearch() {
        this.search.parkingName = '';
        this.searchParking();
      },
      handlePageChange(page) {
        // 处理页码变化
      },
      getParkingTypeLabel(type) {
        const types = { underground: '地下车位', ground: '地上车位' };
        return types[type] || '未知';
      },
      getParkingTypeTag(type) {
        const types = { underground: 'primary', ground: 'success' };
        return types[type] || 'info';
      },
      formatDate(date) {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${min}`;
      },
      mockParkings() {
        return [
          { id: 1, parkingName: '车位A1', parkingType: 'underground', isEnabled: true, plateNumber: '京A12345', createdTime: '2023-01-01 10:00', updatedTime: '2023-01-02 12:00' },
          { id: 2, parkingName: '车位B2', parkingType: 'ground', isEnabled: false, plateNumber: '京B67890', createdTime: '2023-01-01 11:00', updatedTime: '2023-01-02 13:00' },
          { id: 3, parkingName: '车位C3', parkingType: 'underground', isEnabled: true, plateNumber: '京C54321', createdTime: '2023-01-01 12:00', updatedTime: '2023-01-02 14:00' },
          { id: 4, parkingName: '车位D4', parkingType: 'ground', isEnabled: true, plateNumber: '京D98765', createdTime: '2023-01-01 13:00', updatedTime: '2023-01-02 15:00' },
          { id: 5, parkingName: '车位E5', parkingType: 'underground', isEnabled: false, plateNumber: '京E87654', createdTime: '2023-01-01 14:00', updatedTime: '2023-01-02 16:00' }
        ];
      }
    },
    mounted() {
      this.searchParking();
    }
  };
  </script>
  
  <style scoped>
  .parking-management-container {
    padding: 20px;
  }
  
  .dialog-footer {
    text-align: right;
  }
  
  .el-form-item {
    margin-bottom: 10px;
  }
  
  .add-parking-btn {
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
  