<template>
  <div class="d-flex flex-column h-100">
    <b-navbar toggleable="lg" type="dark" variant="success"
              class= "d-flex justify-content-between">
      <b-navbar-brand href="#">管理员界面</b-navbar-brand>
      <b-navbar-nav>
        <b-button @click="logout">退出</b-button>
      </b-navbar-nav>
    </b-navbar>
    <div class="flex-grow-1 d-flex">
      <b-nav vertical class="sidebar">
        <b-nav-item v-b-toggle.collapse1 class="menu">
          学员管理
        </b-nav-item>
        <b-collapse id="collapse1">
          <b-nav vertical class="ml-auto">
            <b-nav-item href="#/student" class="submenu">
              学员列表
            </b-nav-item>
          </b-nav>
        </b-collapse>
        <b-nav-item v-b-toggle.collapse2 class="menu">
          讲师管理
        </b-nav-item>
        <b-collapse id="collapse2">
          <b-nav vertical class="ml-auto">
            <b-nav-item href="#/teacher" class="submenu">
              讲师列表
            </b-nav-item>
          </b-nav>
        </b-collapse>
        <b-nav-item v-b-toggle.collapse3 class="menu">
          课程管理
        </b-nav-item>
        <b-collapse id="collapse3">
          <b-nav vertical class="ml-auto">
            <b-nav-item href="#/course" class="submenu">
              课程列表
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav>
      <div class="flex-grow-1 main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AHome",
  data() {
    return {
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
  .sidebar{
    width: 200px;
    height: 100%;
    background-color: #b5e095;
  }
  .main{
    background-color: #ffffff;
  }
  .menu{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
  .submenu{
    height: 40px;
    line-height: 40px;
    text-align: center;
    text-indent: 2em;
    font-size: 16px;
  }
  .menu a,.submenu a{
    color: #ffffff;
  }
</style>