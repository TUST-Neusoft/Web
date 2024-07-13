<template>
  <el-form ref="loginForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left">

    <div class="title-container">
      <h4 class="title">注册账号</h4>
    </div>

    <el-form-item prop="phone">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="phone"
        v-model="registerForm.phone"
        placeholder="手机号"
        name="phone"
        type="text"
        tabindex="1"
        auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="userPassword">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        :key="passwordType"
        ref="userPassword"
        v-model="registerForm.userPassword"
        :type="passwordType"
        placeholder="密码"
        name="password"
        tabindex="2"
        auto-complete="on"
        @keyup.enter.native="handleLogin"
      />
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>

    <el-form-item prop="confirmPassword">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        :key="passwordType"
        ref="confirmPassword"
        v-model="confirmPassword"
        :type="passwordType"
        placeholder="再次输入密码"
        name="confirmPassword"
        tabindex="3"
        auto-complete="on"
        @keyup.enter.native="handleLogin"
      />
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>

    <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册</el-button>

  </el-form>
</template>

<script>
import CryptoJS from 'crypto-js'
import { register } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      registerForm: {
        phone: '',
        userPassword: '',
        userStatus: 1
      },
      registerRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      confirmPassword: '',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      backgroundImage: require('@/assets/login.png')
    }
  },
  computed: {
    loginContainerStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        width: '100%',
        overflow: 'hidden'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.userPassword.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const encryptedPassword = CryptoJS.MD5(this.registerForm.userPassword).toString()
          this.registerForm.userPassword = encryptedPassword
          const response = await register(this.registerForm)
          if (response.code === 0) {
            this.$message.success('注册成功')
            window.location.reload()
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.userPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg:rgb(234, 234, 234);
$light_gray:#fff;
$cursor: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(234, 234, 234);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100%; 
  width: 100%;
  overflow: hidden;

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-top: -20px;

    .title {
      font-size: 20px;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
