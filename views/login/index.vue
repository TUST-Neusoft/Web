<template>
  <div :style="loginContainerStyle" class="login-container">
    <el-card class="login-form">
      <login v-if="showWhich === 0" />
      <register v-if="showWhich === 1" />
      <forget v-if="showWhich === 2" />
      <div v-if="showWhich === 0" style="float: right;font-size: 14px;">
        <span @click="showWhich = 1">注册</span> | <span @click="showWhich = 2">忘记密码</span>
      </div>
      <div v-if="showWhich === 1" style="float: right;font-size: 14px;">
        <span @click="showWhich = 0">登录</span> | <span @click="showWhich = 2">忘记密码</span>
      </div>
      <div v-if="showWhich === 2" style="float: right;font-size: 14px;">
        <span @click="showWhich = 0">登录</span> | <span @click="showWhich = 1">注册</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import login from './components/login'
import register from './components/register'
import forget from './components/forget'

export default {
  name: 'Login',
  components: { login, register, forget },
  data() {
    return {
      loading: false,
      redirect: undefined,
      backgroundImage: require('@/assets/login.png'),
      showWhich: 0
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
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%; //calc(100vw - 288px)
  width: 100%;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 450px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 0 15vw;
    right: 0;
    top: 100px;
    bottom: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
