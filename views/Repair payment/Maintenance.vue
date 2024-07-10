<template>
  <div class="container1">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="breadcrumb-bold">报事报修</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="custom-tinymce-container">
      <tinymce v-model="content" :height="300" />
    </div>

    <div class="components-container">

      <el-button type="primary" class="button" @click="sendData">发送</el-button>

      <div class="my-issues">
        <div class="section-title">
          我的事项
        </div>
        <el-table :data="tableData" class="table" align="center">
          <el-table-column prop="date" label="事项id" width="400" />
          <el-table-column label="事项内容" width="400">
            <template slot-scope="scope">
              <span style="cursor: pointer; color: #1890ff;" @click="handleItemClick(scope.row)">{{ scope.row.name
                }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="事项状态" width="400">
            <template slot-scope="scope">
              <span
                :style="{ color: scope.row.address === '已处理' ? 'green' : 'red', margin: '5px', border: '1px solid ' + (scope.row.address === '已处理' ? 'green' : 'red'), padding: '3px 8px', borderRadius: '4px' }">{{
                  scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="创建时间" width="400" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data () {
    return {
      content: '', // 确认这里的命名是否正确
      tableData: [
        { date: '1', name: '事项内容1', address: '已处理', time: '2023-05-10 10:30:28' },
        { date: '2', name: '事项内容2', address: '待处理', time: '2023-05-10 10:27:47' },
        { date: '3', name: '事项内容3', address: '已处理', time: '2023-05-10 10:24:11' }
        // 更多事项...
      ]
    }
  },

  methods: {
    changeWang (html) {
      this.WangValue = html
      console.log(this.WangValue)
    },
    sendData () {
      // 处理发送逻辑
    },
    handleItemClick (row) {
      // 处理点击事件，可以在这里添加具体的逻辑，比如打开详情页等操作
      console.log('点击了事项内容：', row)
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
