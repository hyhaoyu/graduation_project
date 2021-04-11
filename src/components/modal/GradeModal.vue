<template>
  <b-modal id="gradeModal" ref="modal" title="课程成绩" @ok="gradeCourse">
    <b-form ref="form" @submit.stop.prevent="handleSubmit"
            autocomplete="off">
      <b-form-group label="课程成绩" label-for="input-1"
                    invalid-feedback="课程成绩大于等于0小于等于100">
        <b-form-input id="input-1" type="number" v-model="studentCourse.grade"
                      :state="gradeState" required>
        </b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "GradeModal",
  props: {
    studentCourse: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    gradeState(){
      return this.studentCourse.grade >= 0 && this.studentCourse.grade <= 100;
    }
  },
  methods: {
    //设置学生课程成绩
    gradeCourse(bvModalEvt){
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit(){
      if(!this.gradeState){return;}
      let reqData = await this.$http.put('/studentCourse', this.studentCourse);
      this.$toast(reqData.success, reqData.message);
      //刷新
      this.$emit('updateCourseList');
      //关闭交互框
      this.$nextTick(() => {
        this.$bvModal.hide('gradeModal');
      })
    }
  }
}
</script>

<style scoped>

</style>