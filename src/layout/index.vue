<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 在移动设备上点击外部区域关闭 sidebar -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <TopBar />
    <!-- Sidebar 组件，上下排列 -->
    <sidebar class="sidebar-container" style="background-color: #409EFF" />

    <!-- Main container，包括导航栏和主内容 -->
    <div class="main-container">
      <!-- <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div> -->
      <app-main />
    </div>
    <Footer />
  </div>
</template>

<script>
import { Sidebar, TopBar, Footer, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    TopBar,
    Footer,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column; // 垂直排列子元素
  }

  .sidebar-container {
    width: 100%; // 确保 sidebar 宽度占满
    flex-shrink: 0; // 防止 sidebar 被压缩
  }

  .main-container {
    flex: 1; // 使 main-container 占据剩余的空间
    width: 100%; // 确保宽度占满父元素
    display: flex;
    flex-direction: column; // 确保内部元素垂直排列
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    width: 100%;
    position: sticky; // 在垂直布局中使头部保持在顶部
    top: 0;
    z-index: 9;
    transition: width 0.28s;
  }

  .mobile .fixed-header {
    width: 100%;
  }

  // 防止 fixed-header 与 main-container 重叠
  .main-container > .fixed-header + * {
    margin-top: 60px; // 根据实际的 header 高度调整
  }
</style>
