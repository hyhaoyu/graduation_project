<template>
  <div class="con mx-auto w-75">
    <b-breadcrumb>
      <b-breadcrumb-item active>首页</b-breadcrumb-item>
      <b-breadcrumb-item active>课程详情</b-breadcrumb-item>
    </b-breadcrumb>

    <b-card class="course flex-shrink-1 mt-5"
            :img-src="getPicUrl(course)" img-width="300" img-height="300" img-alt="课程图片"
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
      <b-card-text>
        <b-button variant="info"
                  v-b-modal.courseModal>编辑</b-button>
      </b-card-text>
    </b-card>

    <b-card header="课程学员">
      <student-list :course-id="courseId"></student-list>
    </b-card>

    <!--修改课程-->
    <course-modal :is-edit="true" modal-title="修改课程" :form="course"></course-modal>
  </div>
</template>

<script>
import StudentList from '@/components/teacher_view/StudentList'
import CourseModal from '@/components/modal/CourseModal'
export default {
  name: "TeachingCourseDetail",
  components: { CourseModal, StudentList },
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
        this.teacherName = reqData.result.teacherName;
      }
    }
  },
  created() {
    this.getCourseDetail();
  }
}
</script>

<style scoped>
</style>