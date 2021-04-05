<template>
  <div class="con">
    <b-card-group class="mx-auto mt-5 w-75" deck
                  v-for="courseList in courseGroup" :key="courseList[0].id">
      <b-card class="course"
              v-for="course in courseList" :key="course.id"
              :img-src="getPicUrl(course)"
              img-height="200"
              img-alt="课程图片" img-top>
        <b-card-title>
          {{ course.courseName }}
        </b-card-title>
        <b-card-text>
          时长：{{ course.duration}}
        </b-card-text>
        <b-card-text class="small text-muted">
          在学人数：{{ course.headcount }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">讲师：{{ course.teacherName }}</small>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props:{
    courseGroup:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    getPicUrl(course){
      return course.picUrl? this.$host+course.picUrl: require('../../assets/images/avatar.jpg');
    }
  }
}
</script>

<style scoped>
  .con{
    font-size: 16px;
  }
  .course{
    min-width: 200px;
    max-width: 200px;
  }
</style>