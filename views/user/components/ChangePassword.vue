<template>
  <div class="change-password-container">
    <h2 class="title">密码修改</h2>
    <el-form :model="form" label-width="80px" class="form">
      <el-form-item label="新密码" required>
        <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="重复密码" required>
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码" />
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="changePassword">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'

export default {
  data () {
    return {
      form: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async changePassword () {
      // 修改密码逻辑
      if (this.form.newPassword === this.form.confirmPassword) {
        const response = await updatePassword(this.form.confirmPassword)
        this.$message.success('密码修改成功')
      } else {
        this.$message.error('两次输入的密码不一致')
      }
    },
    resetForm () {
      this.form.newPassword = ''
      this.form.confirmPassword = ''
    }
  }
}
</script>

<style scoped>
.change-password-container {
  margin-top: -30px;
  /* 调整这个值来向上或向下移动表单 */
  margin-left: 20px;
  /* 调整这个值来改变整个表单的位置 */
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
</style>
