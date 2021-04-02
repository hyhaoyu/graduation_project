<template>
  <div class="con">
    <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师管理</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师列表</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师{{$route.params.name}}的课程</b-breadcrumb-item>
    </b-breadcrumb>

    <course-list></course-list>
  </div>
</template>


<script>
import CourseList from '@/components/dataList/CourseList'
export default {
name: "TeacherCourse",
  components: { CourseList }
}
</script>

<style scoped>
  .con{
    font-size: 14px;
  }
</style>