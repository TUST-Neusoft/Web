<template>
    <div>
        <div class="container">
            <div>
                <el-divider direction="vertical" style="border-left: 1px solid blue;"></el-divider>
                <span style="font-size: 20px; font-weight: bold;">车位管理</span>
            </div>
        </div>
        <el-divider></el-divider>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource" size="medium">
                    <el-radio border label="中介看房"></el-radio>
                    <el-radio border label="搬家放行"></el-radio>
                    <el-radio border label="送货上门"></el-radio>
                    <el-radio border label="朋友来访"></el-radio>
                    <el-radio border label="家政服务"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                            style="width: 50%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <p style="margin-left: 40px; color: gray; display: inline-block;">有效次数</p>
            <p style="color: red; font-weight: bold; display: inline-block;margin-left: 20px;">仅限1次</p>

        </el-form>
        <el-button style="width: 200px;margin-left: 40px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-divider content-position="left">
            <p style="font-size: 15px;">我的登记</p>
        </el-divider>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="访客id" style="width: 100%">
            </el-table-column>
            <el-table-column prop="goal" label="来访目的" style="width: 100%">
            </el-table-column>
            <el-table-column prop="date" label="来访时间" style="width: 100%">
            </el-table-column>
            <el-table-column prop="state" label="来访状态" style="width: 100%">
                <template scope="scope">
                    <el-tag :type="getStateType(scope.row.state)">{{ scope.row.state }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="creationtime" label="创建时间" style="width: 100%">
            </el-table-column>
        </el-table>
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
</style>
<script>
export default {
    name: 'VisitorRegistration',
    data() {
        return {
            ruleForm: {
                date1: '',
                resource: '',
            },
            rules: {
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],

            },
            tableData: [
                {
                    id: '4',
                    goal: '中介看房',
                    date: '2024-2-11',
                    state: '已来访',
                    creationtime: '2023-05-10 16:15:25'
                },
                {
                    id: '3',
                    goal: '中介看房',
                    date: '2024-2-11',
                    state: '待来访',
                    creationtime: '2023-05-10 16:15:25'
                },
                {
                    id: '2',
                    goal: '中介看房',
                    date: '2024-2-11',
                    state: '待来访',
                    creationtime: '2023-05-10 16:15:25'
                },
                {
                    id: '1',
                    goal: '中介看房',
                    date: '2024-2-11',
                    state: '待来访',
                    creationtime: '2023-05-10 16:15:25'
                },

            ],
            nextId: 5, // 下一个访客ID
        };
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const newEntry = {
                        id: this.nextId.toString(),
                        goal: this.ruleForm.resource,
                        date: this.ruleForm.date1.toLocaleDateString(), // 将日期格式化为本地日期字符串
                        state: '待来访',
                        creationtime: new Date().toLocaleString()
                    };
                    this.tableData.unshift(newEntry);
                    this.nextId++;
                    this.$refs[formName].resetFields();
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getStateType(state) {
            const stateMap = {
                '待来访': 'danger', // 例如，待来访可以用 warning 类型
                '已来访': 'success', // 已来访可以用 success 类型
                // 其他状态可以继续添加映射
            };
            return stateMap[state] || 'info'; // 默认为 info 类型
        },
    }
}
</script>