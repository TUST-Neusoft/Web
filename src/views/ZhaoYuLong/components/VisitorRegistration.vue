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
        <div class="table-container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="访客id">
                </el-table-column>
                <el-table-column prop="goal" label="来访目的">
                </el-table-column>
                <el-table-column prop="date" label="来访时间">
                </el-table-column>
                <el-table-column prop="state" label="来访状态">
                    <template v-slot="scope">
                        <el-tag :type="getStateType(scope.row.state)">{{ scope.row.state }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="creationtime" label="创建时间">
                </el-table-column>
            </el-table>
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
    max-height: 400px; /* 设置最大高度 */
    overflow-y: auto; /* 允许垂直滚动 */
}
</style>

<script>
import { getMyVisitor, addVisitor } from '@/api/visitor'; // 修改为实际的api调用

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
            tableData: [],
            nextId: 5, // 下一个访客ID
        };
    },
    mounted() {
        this.getMyVisitor();
    },
    methods: {
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const currentDate = new Date();
                    const datePart = this.ruleForm.date1.toISOString().split('T')[0];
                    const timePart = currentDate.toTimeString().split(' ')[0];
                    const visitorTime = `${datePart}T${timePart}`;
                    const newVisitor = {
                        visitor_objective: this.ruleForm.resource,
                        visitor_time: visitorTime,
                    };
                    console.log('Submitting data:', newVisitor); // 打印提交的数据
                    try {
                        const response = await addVisitor(newVisitor);
                        console.log('Response:', response); // 打印响应数据
                        if (response.code === 0) {
                            const newEntry = {
                                id: this.nextId.toString(),
                                goal: newVisitor.visitor_objective,
                                date: new Date(`${datePart} ${timePart}`).toLocaleString(), // 格式化日期并添加当前时间
                                state: '待来访',
                                creationtime: new Date().toLocaleString()
                            };
                            this.tableData.push(newEntry); // 直接添加到表格的末尾
                            this.nextId++;
                            this.$refs[formName].resetFields();
                            this.$message.success('提交成功!');
                        } else {
                            this.$message.error('添加访客记录失败: ' + response.message);
                        }
                    } catch (error) {
                        if (error.response) {
                            // 服务器返回了一个错误响应
                            console.error('提交失败:', error.response.data); // 打印详细的错误信息
                            this.$message.error('提交失败: ' + error.response.data.message);
                        } else {
                            // 网络错误或其他问题
                            console.error('提交失败:', error.message); // 打印错误信息
                            this.$message.error('提交失败: ' + error.message);
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getStateType(state) {
            const stateMap = {
                '待来访': 'danger',
                '已来访': 'success',
            };
            return stateMap[state] || 'info';
        },
        async getMyVisitor() {
            const response = await getMyVisitor();
            if (response.code === 0) {
                this.tableData = response.data.map(visitor => ({
                    id: visitor.id.toString(),
                    goal: visitor.visitorObjective,
                    date: new Date(visitor.visitorTime).toLocaleString(), // 格式化日期
                    state: visitor.visitorStatus === 0 ? '已来访' : '待来访',
                    creationtime: new Date(visitor.createTime).toLocaleString()
                }));
            } else {
                this.$message.error('获取访客记录失败');
            }
        }
    }
}
</script>
