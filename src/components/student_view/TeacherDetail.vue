<template>
  <div class="con mx-auto w-75">

    <b-breadcrumb>
      <b-breadcrumb-item active>首页</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师详情</b-breadcrumb-item>
    </b-breadcrumb>

    <b-card class="mt-2"
            :img-src="getPicUrl(teacher)" img-height="150" img-alt="头像" img-left>
      <b-card-title>
        {{ teacher.realName }}
      </b-card-title>
      <b-card-text>
        性别：{{ getGender(teacher)}}
      </b-card-text>
      <b-card-text class="small text-muted">
        年龄：{{ teacher.age }}
      </b-card-text>
      <b-card-text class="small text-muted">
        联系方式：{{ teacher.phone }}
      </b-card-text>
      <b-card-text class="small text-muted">
        介绍：{{ teacher.introduction }}
      </b-card-text>
    </b-card>


    <b-card header="讲师课程">
      <course-list :teacher-id="teacherId"></course-list>
    </b-card>

  </div>
</template>

<script>
import CourseList from '@/components/student_view/CourseList'
export default {
  name: "TeacherDetail",
  components: { CourseList },
  props:{
    teacherId:{
      type: String,
      default(){
        return ''
      }
    }
  },
  data(){
    return{
      teacher: {}
    }
  },
  methods:{
    getPicUrl(teacher){
      return teacher.avatarUrl? this.$host+teacher.avatarUrl: require('../../assets/images/avatar.jpg');
    },
    getGender(teacher){
      return teacher.gender? "男":"女";
    },
    async getTeacherDetail(){
      let reqData = await this.$http.get(`/teacher/${this.teacherId}`)
      if(reqData.success){
        this.teacher = reqData.result;
      }
    },
  },
  created() {
    this.getTeacherDetail();
  }
}
</script>

<style scoped>

</style>