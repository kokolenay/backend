<template>
  <div class="personal-center">
    <!-- 个人信息卡片 -->
    <el-card class="user-info-card">
      <div slot="header" class="card-header">
        <span>个人信息</span>
      </div>
      <div style="margin-left: 50px;">
        <div class="avatar" style="display: inline-block;">
          <img src="../../assets/u169.svg" style="width: 100px; height: 100px;"/>
        </div>
        <div class="user-info" style="display: inline-block; margin-left: 30px;">
          <p><strong>姓名:&nbsp;</strong> {{ userInfo.username }}</p>
          <p><strong>工号:&nbsp;</strong> 00{{ userInfo.id }}</p>
          <p><strong>邮箱:&nbsp;</strong> 202400{{ userInfo.id }}@cqu.edu.com</p>
          <p><strong>学院:&nbsp;</strong> 计算机学院</p>
        </div>
      </div>
    </el-card>

    <!-- 修改密码 -->
    <el-card class="change-password-card">
      <div slot="header" class="card-header">
        <span>修改密码</span>
      </div>
      <el-form :model="passwordForm" ref="passwordForm" label-width="120px">
        <el-form-item label="旧密码" :rules="[{ required: true, message: '请输入旧密码', trigger: 'blur' }]">
          <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' }]">
          <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <!-- 其他设置 -->
    <el-card class="settings-card">
      <div slot="header" class="card-header">
        <span>管理</span>
      </div>
      <el-menu style="margin-left: 50px;">
        <router-link to="/users" tag="div">
          <el-menu-item index="1">用户管理</el-menu-item>
        </router-link>
        <router-link to="/notice" tag="div">
          <el-menu-item index="2">通知管理</el-menu-item>
        </router-link>
        <router-link to="/email" tag="div">
          <el-menu-item index="3">邮件通知</el-menu-item>
        </router-link>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        id: '',
        password: ""
      },
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      }
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  methods: {
    editProfile() {
      // 处理编辑个人信息的逻辑
      console.log('Edit profile');
    },
    changePassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          console.log(this.userInfo.password);
          if (this.passwordForm.oldPassword != this.userInfo.password) {
            alert("密码验证失败")
          } else if (this.passwordForm.oldPassword == this.passwordForm.newPassword) {
            alert("新旧密码不能一样")
          } else {
            console.log(this.userInfo.id, this.passwordForm.newPassword)
            // 发送请求到后端
            this.axios.post('/user/updateUser', {
              id: this.userInfo.id,
              password: this.passwordForm.newPassword
            })
            .then((response) => {
              if (response.data.code === 200) {
                this.userInfo.password = this.passwordForm.newPassword;
                localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                this.$message.success('密码修改成功');
              } else {
                this.$message.error('密码修改失败: ' + response.data.msg);
              }
            })
            .catch((error) => {
              console.error('请求失败', error);
              this.$message.error('密码修改失败');
            });
          }
        } else {
          console.error('表单验证失败');
          this.$message.error('请填写必填字段');
        }
      });
    }
  }
};
</script>

<style scoped>
.personal-center {
  padding: 20px;
}

.user-info-card, .change-password-card, .settings-card {
  margin-bottom: 10px; /* 调整间距 */
}

.card-header {
  font-size: 16px;
}

.user-info {
  margin-top: 10px;
}

.user-info p {
  margin: 5px 0;
}

.change-password-card {
  max-width: 100%; /* 限制卡片最大宽度 */

}

.el-form-item {
  margin-bottom: 15px; /* 调整表单项之间的间距 */
}

.el-avatar {
  margin: 20px 0;
}

.el-menu {
  width: 100%;
}

.el-menu-item {
  cursor: pointer;
}
</style>
