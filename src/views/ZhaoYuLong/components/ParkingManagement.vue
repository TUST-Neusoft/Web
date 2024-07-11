<template>
    <div>
        <div class="container">
            <div>
                <el-divider direction="vertical" style="border-left: 1px solid blue;"></el-divider>
                <span style="font-size: 20px; font-weight: bold;">车位管理</span>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="card-container">
            <div class="card-row">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">龙湖舜山府-地下车库-D022</span>
                        <el-button style="float: right; padding: 3px 0" type="text"
                            @click="openDialog('D022')">+添加车辆</el-button>
                    </div>
                    <div class="text item">车位状态：<el-tag type="success">启用中</el-tag></div>
                    <div class="text item">车位类型：<el-tag type="success">地下车库</el-tag></div>
                    <div class="text item">已绑定车牌号：
                        <span v-for="(plate, index) in plates['D022']" :key="index" class="plate-number">{{ plate }}</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">大湖山语-地上-01</span>
                        <el-button style="float: right; padding: 3px 0" type="text"
                            @click="openDialog('01')">+添加车辆</el-button>
                    </div>
                    <div class="text item">车位状态：<el-tag type="success">启用中</el-tag></div>
                    <div class="text item">车位类型：<el-tag>地上车位</el-tag></div>
                    <div class="text item">已绑定车牌号：
                        <span v-for="(plate, index) in plates['01']" :key="index" class="plate-number">{{ plate }}</span>
                    </div>
                </el-card>
            </div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-weight: bold;">龙湖发山府-地下车库-D011</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog('D011')">+添加车辆</el-button>
                </div>
                <div class="text item">车位状态：<el-tag type="success">启用中</el-tag></div>
                <div class="text item">车位类型：<el-tag type="success">地下车库</el-tag></div>
                <div class="text item">已绑定车牌号：
                        <span v-for="(plate, index) in plates['D011']" :key="index" class="plate-number">{{ plate }}</span>
                    </div>
            </el-card>
        </div>

        <el-dialog title="车辆绑定" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <p style="font-size: 17px; margin-left: 20px;"><i
                        class="el-icon-location-information"></i>{{ currentSlotName }}</p>
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item style="width: 400px;" label="车牌号码" prop="number"
                        :rules="[{ required: true, message: '车牌号码不能为空' }]">
                        <el-input v-model="numberValidateForm.number" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" icon='el-icon-check' @click="submitForm">提交</el-button>
                <el-button icon='el-icon-close' @click="dialogFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
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

.card-container {
    display: flex;
    flex-direction: column;
}

.card-row {
    display: flex;
    margin-bottom: 20px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.plate-number {
    display: inline-block;
    margin-right: 10px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
    margin-right: 40px;
}
</style>

<script>
export default {
    name: 'ParkingManagement',
    data() {
        return {
            dialogFormVisible: false,
            currentSlotId: '',
            currentSlotName: '',
            form: {},
            numberValidateForm: {
                number: ''
            },
            plates: {
                'D022': [],
                '01': [],
                'D011': []
            } // 存储已绑定的车牌号码
        };
    },
    methods: {
        openDialog(slotId) {
            this.currentSlotId = slotId;
            this.currentSlotName = this.getSlotName(slotId);
            this.dialogFormVisible = true;
            this.numberValidateForm.number = ''; // 打开对话框时清空输入框
        },
        submitForm() {
            this.$refs.numberValidateForm.validate((valid) => {
                if (valid) {
                    this.plates[this.currentSlotId].push(this.numberValidateForm.number); // 将输入的车牌号码添加到对应的数组中
                    this.dialogFormVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getSlotName(slotId) {
            switch(slotId) {
                case 'D022': return '龙湖舜山府-地下车库-D022';
                case '01': return '大湖山语-地上-01';
                case 'D011': return '龙湖发山府-地下车库-D011';
                default: return '';
            }
        }
    }
}
</script>
