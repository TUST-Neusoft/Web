<template>
  <div class="container">
    <el-steps :active="active" finish-status="success" class="custom-steps" align-center>
      <el-step title="选择支付方式" />
      <el-step title="支付成功" />
    </el-steps>

    <div class="title1">
      <h2>订单商品信息</h2>
      <h4>订单号：{{ totalAmount }}</h4>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="productInformation" label="商品信息" width="800" />
      <el-table-column prop="monovalent" label="单价" width="200" />
      <el-table-column prop="quantity" label="数量" width="200" />
      <el-table-column prop="subtotal" label="小计" />
    </el-table>

    <div class="totalamount">总金额：&yen;{{ totalAmount }}</div>
    <div class="title2">
      <h2>选择支付方式</h2>
    </div>

    <div class="button-custom">
      <el-button type="primary" icon="icon-yuezhifu" @click="showBalanceDialog">
        <svg-icon icon-class="icon-yuezhifu" />余额支付</el-button>
      <el-button type="primary" icon="icon-weixinzhifu" @click="showQRCode('wechat')">
        <svg-icon icon-class="icon-weixinzhifu" />微信支付</el-button>
      <el-button type="primary" icon="icon-zhifubaozhifu" @click="showQRCode('alipay')">
        <svg-icon icon-class="icon-zhifubaozhifu" />支付宝</el-button>
    </div>

    <!------余额支付弹窗-->
    <el-dialog title="余额支付" :visible.sync="balanceDialogVisible">
      <p>您的余额为：&yen;{{ balance }}</p>
      <el-form>
        <el-form-item label="支付密码">
          <el-input v-model="paymentPassword" show-password placeholder="请输入支付密码" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="balanceDialogVisible = false">取消支付</el-button>
        <el-button type="primary" @click="handleBalancePayment">确认支付</el-button>
      </span>
    </el-dialog>

    <!---微信支付支付宝弹窗-->
    <el-dialog :title="qrDialogTitle" :visible.sync="qrCodeDialogVisible">
      <img v-if="qrCodeType === 'wechat'" src="" alt="微信支付二维码" style="width: 200px; height: 200px;">
      <img v-else-if="qrCodeType === 'alipay'" src="" alt="支付宝支付二维码" style="width: 200px; height: 200px;">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      tableData: [
        { productInformation: '商品A', monovalent: 100, quantity: 2, subtotal: 200 },
        { productInformation: '商品B', monovalent: 150, quantity: 3, subtotal: 450 },
        { productInformation: '商品C', monovalent: 80, quantity: 5, subtotal: 400 }
      ],
      initialTotalAmount: 1050, // 示例总金额
      balanceDialogVisible: false,
      balance: 500, // 示例余额
      paymentPassword: '',
      qrCodeDialogVisible: false,
      qrCodeType: '', // 微信或支付宝
      qrDialogTitle: ''
    }
  },
  computed: {
    totalAmount () {
      let total = 0
      this.tableData.forEach(item => {
        total += item.subtotal
      })
      return total
    }
  },

  methods: {
    showBalanceDialog () {
      this.balanceDialogVisible = true
    },
    handleBalancePayment () {
      // ... 原有的支付逻辑 ...
      // 更新步骤条状态
      // 这里可以添加实际的支付逻辑，比如向后端发送请求
      // 支付成功后显示成功信息和按钮
      // 使用 $router.push 进行页面跳转
      this.$router.push('/src/views/cart/paysucceed.vue')
    },
    showQRCode (type) {
      if (type === 'wechat') {
        this.qrCodeType = 'wechat'
        this.qrDialogTitle = '微信支付'
        this.qrCodeDialogVisible = true
      } else if (type === 'alipay') {
        this.qrCodeType = 'alipay'
        this.qrDialogTitle = '支付宝支付'
        this.qrCodeDialogVisible = true
      }
    }
  }
}

</script>

<style>
.container {
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
}

.custom-steps {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

.title1 {
  margin-top: 30px;
}

.totalamount {
  text-align: right;
  font-weight: bold;
  margin-top: 30px;
}

.title2 {
  margin-top: 30px;
}

.button-custom img {
  width: 20px;
  /* 调整图片的宽度 */
  margin-right: 8px;
  /* 可选：调整图片和文本之间的间距 */
}

.button-custom .el-button {
  margin: 5px 10px;
  padding: 15px 30px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  font-size: 25px;
  background-color: #FFFFFF;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0);
  /* 设置边框颜色为透明 */
}

.button-custom .el-button .el-icon-svg {
  width: 30px;
  /* 调整图标的宽度 */
  height: 30px;
  /* 调整图标的高度 */
}
</style>
