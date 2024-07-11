<template>
  <div class="recharge-container">
    <h2 class="title">钱包充值</h2>
    <el-form :model="form" label-width="80px" class="form">
      <el-form-item label="钱包余额">
        <span>{{ balance }}</span>
      </el-form-item>
      <el-form-item label="充值金额" required>
        <el-input v-model="form.amount" placeholder="请输入充值金额"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" required>
        <el-radio-group v-model="form.paymentMethod" size="medium">
          <el-radio label="wechat" border>微信支付</el-radio>
          <el-radio label="alipay" border>支付宝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="confirmRecharge">充值</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="确认充值信息" :visible.sync="dialogVisible">
      <p>充值金额：{{ form.amount }}</p>
      <p>支付方式：{{ getPaymentMethodLabel(form.paymentMethod) }}</p>
      <p>充值后余额：{{ (parseFloat(balance) + parseFloat(form.amount)).toFixed(2) }}</p>
      <p>请扫码支付：</p>
      <div class="qr-code">
        <img src="https://via.placeholder.com/150" alt="QR Code" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消支付</el-button>
        <el-button type="primary" @click="completePayment">支付完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: '80,064.42', // 示例余额
      form: {
        amount: '',
        paymentMethod: 'wechat'
      },
      dialogVisible: false
    };
  },
  methods: {
    confirmRecharge() {
      if (this.form.amount && this.form.paymentMethod) {
        this.dialogVisible = true;
      } else {
        this.$message.error('请填写完整的充值信息');
      }
    },
    resetForm() {
      this.form.amount = '';
      this.form.paymentMethod = 'wechat';
    },
    getPaymentMethodLabel(value) {
      const options = {
        wechat: '微信支付',
        alipay: '支付宝'
      };
      return options[value] || '';
    },
    completePayment() {
      this.$message.success('支付成功');
      this.dialogVisible = false;
      this.balance = (parseFloat(this.balance.replace(/,/g, '')) + parseFloat(this.form.amount)).toFixed(2);
      this.resetForm();
    }
  }
};
</script>

<style scoped>
.recharge-container {
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

.qr-code {
  text-align: center;
  margin: 20px 0;
}

.dialog-footer {
  text-align: right;
}
</style>
