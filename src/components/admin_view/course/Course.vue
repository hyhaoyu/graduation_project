<template>
  <div class="course-container">
    <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>课程管理</b-breadcrumb-item>
      <b-breadcrumb-item active>课程列表</b-breadcrumb-item>
    </b-breadcrumb>

    <course-list></course-list>
  </div>
</template>

<script>
import CourseList from '@/components/admin_view/dataList/CourseList'

export default {
  name: "Course",
  components: {
    CourseList
  }
}
</script>

<style scoped>
  .course-container{
    font-size: 14px;
  }
</style>