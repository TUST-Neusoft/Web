<template>
  <div class="personal-info-container">
    <h2 class="title">个人资料</h2>
    <el-form :model="userData" label-width="80px" class="form">
      <el-form-item label="用户头像" class="avatar-item">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userData.avatar" :src="userData.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <span class="tip">头像大小不能超过 3M</span>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userData.userName" />
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="userData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userData.mail" />
      </el-form-item>
      <el-form-item label="手机号码" required>
        <el-input v-model="userData.phone" />
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="updateUser">确认修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'

export default {
  props: ['userData'],
  data() {
    return {
      form: {
        avatar: '',
        userName: '奥里给',
        gender: '男',
        email: 'mazhihao@neuedu.com',
        phone: '18611111111'
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return (isJPG || isPNG) && isLt3M
    },
    resetForm() {
      this.userData = {
        avatar: null,
        createTime: null,
        id: null,
        lastLoginTime: null,
        mail: null,
        phone: '',
        sex: null,
        updateTime: null,
        userName: '',
        userPassword: null,
        userStatus: 0
      }
      this.$message.success('已重置')
    },
    async updateUser() {
      const response = await updateUser(this.userData)
      if (response.code === 0) {
        this.$message.success('个人资料已更新')
      }
    }
  }
}
</script>

<style scoped>
.personal-info-container {
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

.avatar-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px; /* 调整这个值来增加/减少头像部分和其他内容之间的间距 */
}

.avatar-uploader {
  display: inline-block;
  width: 78px;
  height: 78px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 5px; /* 调整这个值来增加/减少头像框和提示文本之间的间距 */
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 78px;
  text-align: center;
  margin-left: 15px;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 4px;
}

.tip {
  display: block;
  color: #909399;
  margin-top: 5px; /* 调整这个值来增加/减少提示文本和头像框之间的间距 */
}

.form-buttons {
  text-align: left;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
