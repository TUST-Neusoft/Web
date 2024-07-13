<template>
  <div class="transfer-container">
    <h2 class="title">钱包转账</h2>
    <el-form :model="form" label-width="100px" class="form">
      <el-form-item label="钱包余额">
        <span>{{ balance }}</span>
      </el-form-item>
      <el-form-item label="对方手机号" required>
        <el-input v-model="form.phone" placeholder="请输入对方手机号" />
      </el-form-item>
      <el-form-item label="转账金额" required>
        <el-input v-model="form.money" placeholder="请输入转账金额" />
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="confirmTransfer">转账</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="确认转账信息" :visible.sync="dialogVisible">
      <p>转账金额：{{ form.amount }}</p>
      <el-table :data="transferInfo" style="width: 100%">
        <el-table-column prop="name" label="用户名" width="150" />
        <el-table-column prop="phone" label="手机号" width="150" />
        <el-table-column prop="email" label="电子邮件" />
      </el-table>
      <el-form :model="form" label-width="120px" style="margin-top: 20px;">
        <el-form-item label="上次登录时间" style="margin-bottom: 0;">
          <span>{{ transferInfo[0].date }}</span>
        </el-form-item>
        <el-form-item label="验证码" required>
          <el-input v-model="form.verificationCode" placeholder="请输入验证码" class="verification-input" />
          <el-button @click="sendCode">发送验证码</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消转账</el-button>
        <el-button type="primary" @click="transferMoney">确认转账</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMyWallet, transferMoney } from '@/api/wallet'
export default {
  data() {
    return {
      balance: '80,264.42', // 示例余额
      form: {
        phone: '',
        money: ''
      },
      dialogVisible: false,
      transferInfo: [
        {
          name: '新用户63324245',
          phone: '18622222222',
          email: 'user@example.com',
          date: '2023-05-15 13:52:21'
        }
      ]
    }
  },
  mounted() {
    this.getMyWallet()
  },
  methods: {
    confirmTransfer() {
      if (this.form.phone && this.form.money) {
        this.dialogVisible = true
      } else {
        this.$message.error('请填写完整的转账信息')
      }
    },
    resetForm() {
      this.form.phone = ''
      this.form.amount = ''
      this.form.verificationCode = ''
    },
    sendCode() {
      this.$message.success('验证码已发送')
      // 这里添加发送验证码的逻辑
    },
    completeTransfer() {
      if (this.form.verificationCode) {
        this.$message.success('转账成功')
        this.dialogVisible = false
        this.balance = (parseFloat(this.balance.replace(/,/g, '')) - parseFloat(this.form.amount)).toFixed(2)
        this.resetForm()
      } else {
        this.$message.error('请输入验证码')
      }
    },
    async getMyWallet() {
      const response = await getMyWallet()
      this.balance = response.data
    },
    async transferMoney() {
      const response = await transferMoney(this.form)
      this.$message.success('转账成功')
      this.dialogVisible = false
      this.getMyWallet()
    }
  }
}
</script>

<style scoped>
.transfer-container {
  margin-top: -30px; /* 调整这个值来向上或向下移动表单 */
  margin-left: 20px; /* 调整这个值来改变整个表单的位置 */
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form {
  width: 100%;
  max-width: 400px;
}

.form-buttons {
  text-align: left;
}

.el-form-item {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}

.verification-input {
  width: 200px; /* 调整这个值来设置验证码输入框的宽度 */
}
</style>
