<template>
    <el-container>
      <el-container class="inner-container">
        <el-main>
          <!-- 邮件发送表单 -->
          <el-form :model="emailForm" ref="emailForm" label-width="120px" class="email-form">
            <el-form-item label="收件人" label-width="80px">
              <el-input v-model="emailForm.emails" type="textarea" placeholder="请输入邮件地址，多个地址用逗号分隔" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="邮件标题" label-width="80px">
              <el-input v-model="emailForm.title" placeholder="请输入邮件标题" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="邮件内容" label-width="80px">
              <el-input type="textarea" v-model="emailForm.content" placeholder="请输入邮件内容" rows="10" class="content-input input-field"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sendEmail()" class="send-button">发送邮件</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCollapse: false,
        title: true,
        emailForm: {
          emails: '',  // 这里是以逗号分隔的邮件地址
          title: '',
          content: ''
        }
      }
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse;
        this.title = !this.isCollapse;
      },
      handleClose() {
        console.log()
      },
      handleOpen() {},
      exit() {
        this.$router.push('/');
      },
      async sendEmail() {
        const emailsArray = this.emailForm.emails.split(',').map(email => email.trim());
        const formattedContent = this.emailForm.content.replace(/\n/g, '<br>');
  
        try {
          const res = await this.axios.post('/user/email', {
            emails: emailsArray,
            title: this.emailForm.title,
            content: formattedContent
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (res.data.code == 200) {
            this.$message.success("发送成功");
          } else {
            this.$message.error("发送失败");
          }
        } catch (error) {
          console.error('请求错误:', error);
          this.$message.warning("网络连接错误");
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .email-form {
    max-width: 100%;
    margin: 20px auto;
    margin-top: 10px;
    height:700px;
    padding: 20px;
    background-color: #fff; /* 背景颜色为白色 */
    border-radius: 8px; /* 圆角边框 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    padding-right: 30px;
  }
  
  .email-form .el-form-item {
    margin-bottom: 20px;
  }
  
  .email-form .input-field {
    border-radius: 4px; /* 圆角边框 */
  }
  
  .email-form .content-input {
    background-color: #f4f4f4; /* 背景颜色为灰色，模仿大框效果 */
    padding: 10px; /* 内边距 */
  }
  
  .send-button {
    width: 100%;
    padding: 10px;
    margin-left: -20px;
  }
  </style>
  