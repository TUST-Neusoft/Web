<template>

  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">

    <div class="title-container">
      <h4 class="title">忘记密码</h4>
    </div>

    <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="username"
        v-model="loginForm.userName"
        placeholder="用户名"
        name="username"
        type="text"
        tabindex="1"
        auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="username">
      <span class="svg-container">
        <i class="el-icon-phone" />
      </span>
      <el-input
        ref="username"
        v-model="loginForm.phone"
        placeholder="手机号"
        name="phone"
        type="text"
        tabindex="1"
        auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="password">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        :key="passwordType"
        ref="password"
        v-model="loginForm.password"
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

    <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">更新密码</el-button>

  </el-form>
</template>

<script>
import CryptoJS from 'crypto-js'
import { forget } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
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
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const encryptedPassword = CryptoJS.MD5(this.loginForm.password).toString()
          this.loginForm.password = encryptedPassword
          const response = await forget(this.loginForm)
          if (response.code === 0) {
            this.$message.success('更新密码成功')
            window.location.reload()
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

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
  height: 100%; //calc(100vw - 288px)
  width: 100%;
  overflow: hidden;

  .login-form {
    position:absolute;
    width: 450px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 0 15vw;
    right: 0;
    top: 140px;
    bottom: 140px;
    overflow: hidden;
  }

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
