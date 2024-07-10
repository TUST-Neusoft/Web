<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">智慧社区 - 后台管理系统</h2>
        <el-form :model="loginForm" @submit.native.prevent="handleLogin">
          <el-form-item>
            <el-input v-model="loginForm.phone" placeholder="手机号" prefix-icon="el-icon-user" style="font-size: 18px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password style="font-size: 18px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" style="font-size: 18px; padding: 12px 24px;">登录</el-button>
            <el-button @click="resetForm" style="font-size: 18px; padding: 12px 24px;">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loginForm: {
          phone: '',
          password: ''
        }
      };
    },
    methods: {
      handleLogin() {
        // 模拟登录操作
        console.log('登录信息:', this.loginForm);
  
        if (this.loginForm.phone === '18611111111' && this.loginForm.password === '123456') {
          this.$message.success('登录成功');
          this.$router.push({ path: '/admin/role-management' }); // 登录成功后跳转到用户管理页面
        } else {
          this.$message.error('手机号或密码错误');
        }
      },
      resetForm() {
        this.loginForm.phone = '';
        this.loginForm.password = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f6fc;
  }
  
  .login-card {
    width: 500px; /* 增加宽度 */
    padding: 40px; /* 增加内边距 */
  }
  
  .login-title {
    text-align: center;
    font-size: 28px; /* 增加字体大小 */
    margin-bottom: 30px; /* 增加底部边距 */
  }
  </style>
  