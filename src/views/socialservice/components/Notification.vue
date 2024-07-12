<template>
    <div class="container">
        <div>
            <el-divider direction="vertical" style="border-left: 1px solid blue;"></el-divider>
            <span style="font-size: 20px; font-weight: bold;">通知公告</span>
        </div>
        <div class="table-container">
            <el-table :data="paginatedData" style="width: 100%" @row-click="open">
                <el-table-column prop="name" label="公告标题" width="600">
                </el-table-column>
                <el-table-column prop="date" label="日期">
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-bottom: 20px;">
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :page-size.sync="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" background>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: 10px;
    margin-top: 10px;
}

.table-container {
    flex-grow: 1;
    overflow-y: auto;
    width: 1000px;
    margin-top: 10px;
}

.el-table {
    table-layout: fixed;
}

.custom-message-box .el-message-box {
    width: 600px !important; /* 设置弹出框宽度 */
    height: 1000px !important;
    padding: 20px !important; /* 设置弹出框内边距 */
}

.custom-message-box .el-message-box__content {
    height: 500px !important; /* 设置内容区域高度 */
    overflow: auto;
}

.custom-message-box .el-message-box__btns {
    justify-content: center !important;
}

.custom-message-box .el-message-box__btns .el-button--primary {
    background-color: #409EFF !important;
    border-color: #409EFF !important;
    color: #fff !important;
}

.custom-message-box .el-message-box__btns .el-button {
    margin: 0 !important;
}
</style>

<script>
import { MessageBox } from 'element-ui';

export default {
    name: 'Notification',
    data() {
        return {
            tableData: [
                { name: '公告1', date: '2024-07-01' },
                { name: '公告2', date: '2024-07-02' },
                { name: '公告3', date: '2024-07-03' },
                { name: '公告4', date: '2024-07-04' },
                { name: '公告5', date: '2024-07-05' },
                { name: '公告6', date: '2024-07-06' },
                { name: '公告7', date: '2024-07-07' },
                { name: '公告1', date: '2024-07-01' },
                { name: '公告2', date: '2024-07-02' },
                { name: '公告3', date: '2024-07-03' },
                { name: '公告4', date: '2024-07-04' },
                { name: '公告5', date: '2024-07-05' },
                { name: '公告6', date: '2024-07-06' },
                { name: '公告7', date: '2024-07-07' }
            ],
            currentPage: 1,
            pageSize: 10,
        }
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        }
    },
    methods: {
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.handleCurrentChange(1); // 重置为第一页
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
        open(row) {
            MessageBox({
                title: '公告详情',
                message: `标题: ${row.name}<br>日期: ${row.date}`,
                showCancelButton: false,
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                confirmButtonClass: '',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                customClass: 'custom-message-box'
            });
        }
    }
}
</script>
