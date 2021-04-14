<template>
  <!--修改课程信息-->
  <b-modal id="courseModal" ref="modal" :title="modalTitle"
           @show="resetModal" @hidden="resetModal" @ok="courseHandler">
    <b-form ref="form" @submit.stop.prevent="handleSubmit"
            autocomplete="off">
      <b-form-group label="课程图片" label-for="input-0" v-show="isEdit">
        <b-img style="width: 100px; height: 100px" thumbnail :src="picUrl" alt="课程图片"></b-img>
        <b-form-file accept=".jpg, .png, .gif"
                     placeholder="选择图片"
                     drop-placeholder="松开鼠标"
                     v-model="picture" @input="uploadImg"></b-form-file>
      </b-form-group>
      <b-form-group label="课程名" label-for="input-1"
                    invalid-feedback="课程名不能为空">
        <b-form-input id="input-1" v-model="form.courseName"
                      :state="nameState">
        </b-form-input>
      </b-form-group>
      <b-form-group label="课程时长" label-for="input-2"
                    invalid-feedback="课程时长必须大于0">
        <b-form-input id="input-2" type="number" v-model="form.duration"
                      :state="timeState">
        </b-form-input>
      </b-form-group>
      <b-form-group label="课程介绍" label-for="input-3">
        <b-form-textarea id="input-3" type="text" v-model="form.introduction">
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'CourseModal',
  props: {
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
    picUrl(){
      return this.form.picUrl? this.$host+this.form.picUrl: require('../../assets/images/avatar.jpg');
    },
    nameState(){
      return this.init && this.form.courseName != '' && this.form.courseName != null;
    },
    timeState(){
      return this.init && this.form.duration > 0;
    }
  },
  data(){
    return {
      init: null,
      picture: null
    }
  },
  methods: {
    //上传图片
    async uploadImg(){
      if(this.picture){
        let reqData = await this.$http.uploadFile('/course/picture',{id: this.form.id, file: this.picture});
        this.$toast(reqData.success, reqData.message);
        if(reqData.success){
          this.form.picUrl = reqData.result.picUrl;
          this.$emit('updateCourseList');
        }
        else{
          this.picture = null;
        }
      }
    },
    //修改注册学生信息
    courseHandler(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.init = true;
      this.handleSubmit();
    },
    async handleSubmit() {
      if(!this.nameState || !this.timeState){return;}
      let reqData;
      if(!this.isEdit){
        reqData = await this.$http.post("/course", this.form);
      }
      else{
        reqData = await this.$http.put("/course", this.form);
      }
      //刷新
      reqData.success && this.$emit('updateCourseList')
      this.$toast(reqData.success, reqData.message);
      this.$nextTick(() => {
        this.$bvModal.hide('courseModal')
      })
    },
    resetModal() {
      this.init = null;
    }
  }
}
</script>

<style scoped>

</style>