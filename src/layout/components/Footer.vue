<template>
  <div class="footer">
    <p id="web">东软智慧社区 ©2023-2024 东软教育科技集团
      <!-- <span> | </span>
        <a href="#">
          使用手册
        </a> -->
    </p>
    <p id="app" style="text-align: center;font-size: 12px;">社会应急力量一体化应急平台(SEIP) ©2021-2024 MECS项目组</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showQR: false // 控制二维码显示的变量
    }
  },
  methods: {
    toggleQR(event) {
      // 阻止链接默认行为
      event.preventDefault()
      // 切换显示状态
      this.showQR = !this.showQR
    }
  }
}
</script>

  <style scoped>
  .footer a {
    color: #007bff;
  }

  .qr-popup {
    position: absolute;
    bottom: 100%;
    /* 使二维码显示在链接上方 */
    left: 60%;
    /* 从左侧开始50%的位置显示 */
    transform: translateX(-50%);
    /* 向左移动自身宽度的50%，以此来居中 */
    width: 200px;
    z-index: 100;
  }

  @media screen and (max-width: 768px) {
    #web {
      display: none;
    }

    .footer {
      position: relative;
      min-height: 50px;
      background-color: rgb(255, 255, 255);
      color: rgb(111, 114, 114);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .footer p {
      font-size: 13px;
      letter-spacing: 0.5px;
      word-spacing: 1px;
    }
  }

  @media screen and (min-width: 769px) {
    #app {
      display: none;
    }

    .footer {
      position: relative;
      min-height: 50px;
      background-color: rgb(255, 255, 255);
      color: rgb(111, 114, 114);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .footer p {
      font-size: 13px;
      letter-spacing: 0.5px;
      word-spacing: 1px;
      margin: 10px 0;
    }
  }
  </style>
