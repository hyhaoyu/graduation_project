<template>
  <div class="con mx-auto w-75">
    <b-breadcrumb>
      <b-breadcrumb-item active>首页</b-breadcrumb-item>
      <b-breadcrumb-item active>课程详情</b-breadcrumb-item>
    </b-breadcrumb>

    <b-card class="course flex-grow-0 mt-5"
            :img-src="getPicUrl(course)" img-height="300" img-alt="课程图片"
            img-left>
      <b-card-title>
        {{ course.courseName }}
      </b-card-title>
      <b-card-text class="small text-muted text-">
        {{ course.introduction }}
      </b-card-text>
      <b-card-text>
        时长：{{ course.duration}}
      </b-card-text>
      <b-card-text>
        讲师：{{ teacherName }}
      </b-card-text>
      <b-card-text class="small text-muted">
        在学人数：{{ course.headcount }}
      </b-card-text>
      <b-card-text class="small text-muted">
        上架时间：{{ $moment(course.addDate).format('YYYY-MM-DD') }}
      </b-card-text>
      <b-card-text v-if="isMyCourse">
        分数：{{grade}}
      </b-card-text>
      <b-card-text>
        <b-button v-show="!isMyCourse" variant="info"
                  v-b-modal.take>选课</b-button>
        <b-button v-show="isMyCourse" variant="danger"
                  v-b-modal.drop>退选</b-button>
      </b-card-text>
    </b-card>
    <!--选课-->
    <b-modal id="take" @ok="takeCourse">
      是否选择该课程
    </b-modal>
    <!--退选-->
    <b-modal id="drop" @ok="dropCourse">
      是否退选课程
    </b-modal>

  </div>

</template>

<script>
export default {
  name: "CourseDetail",
  props: {
    courseId: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data(){
    return{
      course: {},
      teacherName: "",
      isMyCourse: false,
      grade: ""
    }
  },
  methods: {
    getPicUrl(course){
      return course.picUrl? this.$host+course.picUrl: require('../../assets/images/avatar.jpg');
    },
    async getCourseDetail(){
      let reqData = await this.$http.get(`/course/${this.courseId}`);
      if(reqData.success){
        this.course = reqData.result.course;
        this.isMyCourse = reqData.result.isTake;
        this.grade = reqData.result.grade;
        this.teacherName = reqData.result.teacherName;
        this.studentCourseId =reqData.result.studentCourseId;
      }
    },
    async dropCourse(){
      let reqData = await this.$http.delete(`/studentCourse/${this.studentCourseId}`);
      this.$toast(reqData.success, reqData.message);
      await this.getCourseDetail();
    },
    async takeCourse(){
      let reqData = await this.$http.post(`/studentCourse?id=${this.courseId}`);
      this.$toast(reqData.success, reqData.message);
      await this.getCourseDetail();
    }
  },
  created() {
    this.getCourseDetail();
  }
}
</script>

<style scoped>
  .con{
    font-size: 14px;
  }
</style>