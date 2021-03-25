<template>
  <div class="stu-container">
    <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>学员管理</b-breadcrumb-item>
      <b-breadcrumb-item active>学员列表</b-breadcrumb-item>
    </b-breadcrumb>

    <UserList role="student"></UserList>
  </div>
</template>

<script>
import UserList from '@/components/userList/UserList'
export default {
  name: "Student",
  components:{
    UserList
  }
}
</script>

<style scoped>
  .stu-container{
    font-size: 14px;
  }
</style>