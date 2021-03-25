<template>
  <div class="t-container">
    <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师管理</b-breadcrumb-item>
      <b-breadcrumb-item active>讲师列表</b-breadcrumb-item>
    </b-breadcrumb>

    <UserList role="teacher"></UserList>
  </div>
</template>

<script>
import UserList from '@/components/userList/UserList'
export default {
  name: "Teacher",
  components:{
    UserList
  }
}
</script>

<style scoped>
.t-container{
  font-size: 14px;
}
</style>