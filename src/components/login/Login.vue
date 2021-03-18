<template>
  <div class="container-fluid">
    <div class="row">
      <div class="login-box m-auto">
        <div class="avatar-box m-auto">
          <img src="../../assets/images/login-bg.jpg" alt="">
        </div>
        <div class="input-content px-5 d-flex flex-column justify-content-around">
          <input type="text" placeholder="请输入用户名" required="required"
                 class="mx-auto w-100" :class="{tip:showTip1}"
                 v-model="username"/>
          <input type="password" placeholder="请输入密码"
                 minlength="8" maxlength="16" required="required"
                 class="mx-auto w-100" :class="{tip:showTip2}"
                 v-model="password" @keyup.enter="login"/>
          <button class="confirm-btn" @click="login">登录</button>
          <div class="go-register mx-auto w-100 text-center ">
            <span class="">没账号？去注册</span>
            <span class="float-right" @click="getData">重置</span>
          </div>
        </div>
        <select class="select-btn" v-model="role">
          <option value="user">学生</option>
          <option value="teacher">老师</option>
          <option value="admin">管理员</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/common/request";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      role: "user",
      showTip1: false,
      showTip2: false,
    }
  },
  methods: {
    async login() {
      let username = this.username;
      let password = this.password;
      if (!username) {
        this.showTip1 = true;
        return;
      } else if (!password) {
        this.showTip2 = true;
        return;
      }

      //请求数据
      let reqData = await request.post(`http://localhost:8888/${this.role}/login?`, {username, password});
      // this.isLogin = reqData.success;
      // this.loginMsg = reqData.message;
      // setTimeout(() => {this.loginMsg = ""},1500);
      if (reqData.success) {
        this.$alert.success(reqData.message);
        // this.$alert.loginMsg = reqData.message;
        window.sessionStorage.setItem("token", reqData.result.token);
        this.$router.push('/home');
      } else {
        this.$alert.danger(reqData.message);
      }
    },
    async getData() {
      let reqData = await request.get(`http://localhost:8888/user`);
      console.log(reqData);
    }
  }
}
</script>

<style scoped>
.container-fluid {
  height: 100%;
  background: url("../../assets/images/login-bg.jpg") no-repeat center 0;
  background-size: cover;
}

.row {
  height: 100%;
}

.login-box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 14px;
}

.avatar-box {
  box-shadow: azure -5px -5px 5px 0;
  background-color: #fff;
  transform: translateY(-50px);
}

.avatar-box, .avatar-box img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.input-content {
  height: 200px;
}

.input-content input {
  height: 40px;
  outline: none;
  border-radius: 20px;
  color: #999;
  text-indent: 15px;
  border: 1px solid #e4eaee;
}

.input-content input.tip {
  border-color: #f00000;
}

.input-content .confirm-btn {
  color: #ffffff;
  background-color: #ff0000;
  border-radius: 20px;
  border: 1px solid #e4eaee;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.input-content .confirm-btn:hover {
  background-color: #f00000;
}

.go-register {
  height: 40px;
  line-height: 40px;
  color: #ff0000;
  cursor: pointer;
}

.select-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>