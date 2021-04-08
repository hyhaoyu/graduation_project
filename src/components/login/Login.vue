<template>
  <div class="container-fluid">
    <div class="row">
      <div class="login-box m-auto">
        <div class="avatar-box m-auto">
          <img src="../../assets/images/login-bg.jpg" alt="">
        </div>
        <b-form class="form-content px-5"
                @submit="login" v-if="show">
          <b-form-group id="input-group-1"
                        label="用户名" label-for="input-1">
            <b-form-input id="input-1" v-model="form.username"
                          placeholder="请输入用户名"
                          size="sm" autocomplete="off"
                          required>
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="密码" label-for="input-2">
            <b-form-input id="input-2" type="password"
                          v-model="form.password"
                          placeholder="请输入密码"
                          minlength="8" maxlength="20"
                          size="sm" required>
            </b-form-input>
          </b-form-group>
          <b-button class="login-btn w-100" type="submit" pill>
            登录
          </b-button>
          <div class="go-register" align="center">
            <span class="" v-b-modal.userFormModal v-show="role != 'admin'">没账号？去注册</span>
            <span class="float-right" @click="resetForm">重置</span>
          </div>
        </b-form>
        <b-form-select class="select-btn" v-model="role">
          <b-form-select-option value="student">学生</b-form-select-option>
          <b-form-select-option value="teacher">老师</b-form-select-option>
          <b-form-select-option value="admin">管理员</b-form-select-option>
        </b-form-select>

        <FormModal :is-edit="false" :role="role" :modal-title="role=='student'?'学员注册': '讲师注册'">
        </FormModal>
      </div>
    </div>
  </div>
</template>

<script>
import FormModal from '@/components/modal/UserFormModal'

export default {
  name: "Login",
  components:{
    FormModal
  },
  data() {
    return {
      form: {},
      role: 'student',
      show: true
    }
  },
  methods: {
    async login(event) {
      event.preventDefault();
      //请求数据
      let reqData = await this.$http.post(`/${this.role}/login`, this.form);
      if (reqData.success) {
        window.sessionStorage.setItem("token", reqData.result.token);
        window.sessionStorage.setItem("user", JSON.stringify(reqData.result));
        setTimeout(()=>{
          this.$router.push(`/${this.role}_home`);
        }, 1500);
      }
      this.$toast(reqData.success, reqData.message);
    },
    resetForm() {
      this.form = {};
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

.form-content {
  height: 200px;
  font-size: 14px;
  transform: translateY(-50px);
}

.form-content input {
  height: 40px;
  text-indent: 15px;
  border-radius: 20px;
}

.login-btn{
  background-color: #ff0000;
  border: none;
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
  width: 90px;
}
</style>