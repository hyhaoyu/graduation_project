<template>
  <b-modal id="userFormModal" ref="modal" :title="modalTitle" scrollable
           @show="resetModal" @hidden="resetModal" @ok="userHandler">
    <b-form ref="form" @submit.stop.prevent="handleSubmit"
            autocomplete="off">
      <b-form-group label="头像" label-for="input-0" v-show="isEdit">
        <b-img style="width: 100px; height: 100px" thumbnail :src="avatarUrl" alt="头像"></b-img>
        <b-form-file accept=".jpg, .png, .gif"
                     placeholder="选择图片"
                     drop-placeholder="松开鼠标"
                     v-model="avatar" @input="uploadImg"></b-form-file>
      </b-form-group>
      <b-form-group label="用户名" label-for="input-1"
                    invalid-feedback="用户名不能为空" :state="nameState">
        <b-form-input ref="name" id="input-1" v-model="form.username"
                      :state="nameState" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="密码" label-for="input-2"
                    invalid-feedback="请输入8到20位密码" :state="pswState">
        <b-form-input ref="psw" id="input-2" type="password" minlength="8" maxlength="20"
                      v-model="form.password" :state="pswState" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="真实姓名" label-for="input-3">
        <b-form-input id="input-3" v-model="form.realName">
        </b-form-input>
      </b-form-group>
      <b-form-group label="性别" label-for="input-4"
                    invalid-feedback="性别不能为空" :state="genderState">
        <b-form-radio-group id="input-4" v-model="form.gender">
          <b-form-radio value="1" required>男</b-form-radio>
          <b-form-radio value="0" required>女</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="年龄" label-for="input-5">
        <b-form-input id="input-5" type="number" min="0" v-model="form.age">
        </b-form-input>
      </b-form-group>
      <b-form-group label="联系方式" label-for="input-6"
                    invalid-feedback="请输入正确手机格式">
        <b-form-input id="input-6" v-model="form.phone" :state="phoneState">
        </b-form-input>
      </b-form-group>
      <b-form-group label="自我介绍" label-for="input-7" v-show="role=='teacher'">
        <b-form-textarea id="input-7" v-model="form.introduction">
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "UserFormModal",
  props: {
    role: {
      type: String,
      default() {
        return '';
      }
    },
    isEdit: {
      type: Boolean,
      default(){
        return false;
      }
    },
    modalTitle: {
      type: String,
      default() {
        return '';
      }
    },
    form:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    avatarUrl(){
      return this.form.avatarUrl? this.$host+this.form.avatarUrl: require('../../assets/images/avatar.jpg');
    },
    genderState(){
      return this.init == true? null: this.form.gender == 0 || this.form.gender == 1;
    },
    phoneState(){
      return this.init == true || !this.form.phone? null: this.phoneReg.test(this.form.phone);
    }
  },
  data() {
    return {
      init: true,
      phoneReg: /^1(3|4|5|6|7|8|9)\d{9}$/,
      nameState: null,
      pswState: null,
      avatar: null
    }
  },
  methods:{
    //上传图片
    async uploadImg(){
      if(this.avatar){
        let reqData = await this.$http.uploadFile(`/${this.role}/avatar`,{id: this.form.id, file: this.avatar});
        this.$toast(reqData.success, reqData.message);
        if(reqData.success){
          this.form.avatarUrl = reqData.result.picUrl;
          this.$emit('updateUserList');
        }
        else{
          this.avatar = null;
        }
      }
    },

    //修改注册用户信息
    userHandler(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.init = false;
      this.handleSubmit();
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      let reqData;
      if(!this.isEdit){
        reqData = await this.$http.post(`/${this.role}/register`, this.form);
      }
      else{
        reqData = await this.$http.put(`/${this.role}`, this.form);
      }
      //刷新
      this.$emit('updateUserList');
      this.$toast(reqData.success, reqData.message);
      this.$nextTick(() => {
        this.$bvModal.hide('userFormModal')
      })
    },
    checkFormValidity() {
      let valid1 = this.$refs.name.checkValidity();
      this.nameState = valid1;
      let valid2 = null;
      if(!this.isEdit){
        valid2= this.$refs.psw.checkValidity();
        this.pswState = valid2;
      }
      return valid1 && (valid2 != null?valid2:true) && this.genderState && (this.phoneState == false? false: true);
    },
    resetModal() {
      this.nameState = null;
      this.pswState = null;
      this.init = true;
    }
  }
}
</script>

<style scoped>

</style>