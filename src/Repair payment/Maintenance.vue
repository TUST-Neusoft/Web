<template>
  <div class="container1">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="breadcrumb-bold">报事报修</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="custom-tinymce-container">
      <tinymce v-model="content" :height="300" @change="changeWang" />
    </div>

    <div class="components-container">

      <el-button type="primary" class="button" @click="sendData">发送</el-button>

      <div class="my-issues">
        <div class="section-title">
          我的事项
        </div>
        <el-table :data="tableData" class="table" align="center">
          <el-table-column prop="date" label="事项id" width="100" />
          <el-table-column label="事项内容" width="200">
            <template slot-scope="scope">
              <span style="cursor: pointer; color: #1890ff;" @click="handleItemClick(scope.row)">{{ scope.row.name
                }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="事项状态" width="100">
            <template slot-scope="scope">
              <span :style="{ color: scope.row.address === '已处理' ? 'green' : 'red' }">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="创建时间" width="200" />
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import Tinymce from '@/components/Tinymce'
import { getMyComplaint, addComplaint } from '@/api/complaint'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data () {
    return {
      content: '',
      tableData: []
    }
  },
  created () {
    this.getMyComplaint()
  },
  methods: {
    changeWang (html) {
      this.content = html;
    },
    async sendData () {
      try {
        // 处理发送数据逻辑，示例中未提供具体实现
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    },
    async handleItemClick (row) {
      console.log('点击了事项内容：', row);
      try {
        const response = await addComplaint(row); // 传递参数给 addComplaint
        // 成功添加投诉后，更新表格数据
        this.tableData.push(response.data); // 或者根据实际情况更新
      } catch (error) {
        console.error('Failed to add complaint:', error);
      }
    },
    async getMyComplaint () {
      try {
        const response = await getMyComplaint();
        this.tableData = response.data;
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      }
    }
  }
}
</script>


<style>
.container1 {
  margin: 30px;
  padding: 30px;
  width: auto;
}

.breadcrumb-bold {
  font-weight: bold;
}

.custom-tinymce-container {
  width: auto;
  height: auto;
  margin-top: 20px;
}

.button {
  width: 250px;
  margin-top: 20px;
}

.my-issues {
  margin: 20px;
  padding: 20px;
  border: none;
  border-radius: 4px;
}

.table {
  width: 100%;
  margin-top: 30px;
  max-height: 400px;
  /* 设置最大高度 */
  overflow-y: auto;
  /* 垂直滚动条 */
}
</style>
