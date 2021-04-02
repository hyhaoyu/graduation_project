<template>
  <div class="con">
    <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>课程管理</b-breadcrumb-item>
      <b-breadcrumb-item active>课程列表</b-breadcrumb-item>
      <b-breadcrumb-item active>{{$route.params.name}}课程学员</b-breadcrumb-item>
    </b-breadcrumb>

    <user-list role="student"></user-list>
  </div>
</template>

<script>
import UserList from '@/components/dataList/UserList'
export default {
name: "CourseStudent",
  components: { UserList }
}
</script>

<style scoped>
  .con{
    font-size: 14px;
  }
</style>