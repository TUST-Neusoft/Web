<template>
  <div class="container">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success" class="steps" align-center="">
      <el-step title="验证身份"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="查看结果"></el-step>
    </el-steps>
    
    <!-- 表单 -->
    <el-form :model="form" label-width="120px" class="form">
      <el-form-item label="手机号码" required class="form-item-short-label">
        <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" class="input-long"></el-input>
      </el-form-item>
      <el-form-item label="验证码" required>
        <div class="verification-code-container">
          <el-input v-model="form.verificationCode" placeholder="请输入验证码" class="verification-input"></el-input>
          <el-button type="primary" @click="sendCode" class="send-code-button">发送验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="nextStep" class="next-button">下一步</el-button>
        <el-button @click="resetForm" class="reset-button">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      form: {
        phoneNumber: '',
        verificationCode: ''
      }
    };
  },
  methods: {
    sendCode() {
      // 发送验证码逻辑
      console.log("发送验证码至:", this.form.phoneNumber);
    },
    nextStep() {
      // 下一步逻辑
      this.active = 1;
      console.log("下一步");
    },
    resetForm() {
      this.form.phoneNumber = '';
      this.form.verificationCode = '';
    }
  }
}
</script>

<style scoped>
.container {
  width: 1200px; /* 增加宽度以拉长步骤条 */
  margin: 0 auto;
  padding-top: 20px;
}

.steps {
  margin-bottom: 50px;
  width: 100%; /* 确保步骤条撑满容器 */
}

.form {
  width: 680px; /* 缩小表单部分 */
  margin: 0 auto; /* 居中表单 */
}

.input-long {
  width: 320px; /* 拉长手机号码输入框 */
}

.verification-code-container {
  display: flex;
  align-items: center;
}

.verification-input {
  width: 200px; /* 调整验证码输入框宽度 */
  margin-right: 10px;
}

.send-code-button {
  flex-shrink: 0;
}

.el-form-item {
  display: flex;
  align-items: center;
}

.form-item-short-label .el-form-item__label {
  width: 10px; /* 缩短标签宽度 */
}

.form-buttons {
  display: flex;
  justify-content: center;
}

.next-button, .reset-button {
  width: 150px;
  margin: 0 10px;
}
</style>
