<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">培训机构</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" :to="{name:'allCourse'}">首页</b-nav-item>
          <b-nav-item href="#" :to="{name:'myCourse'}">我的课程</b-nav-item>
          <b-nav-item href="#" :to="{name:'allTeacher'}">机构讲师</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="输入课程名" v-model="courseName"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
                      :to="{name:'allCourse', query:{courseName}}">搜索</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar :src="avatarUrl"></b-avatar>
            </template>
            <b-dropdown-item href="#" v-b-modal.userFormModal @click="getUserForm">个人信息</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">退出登录</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="min-vh-100">
      <router-view :key="$route.fullPath"></router-view>
    </div>

    <user-form-modal :is-edit="true" modal-title="我的信息"
                     :form="form" role="student"
                     @updateUserList="updateUserList">
    </user-form-modal>
  </div>
</template>

<script>
import UserFormModal from '@/components/modal/UserFormModal'
export default {
  name: "SHome",
  components: { UserFormModal },
  computed: {
    avatarUrl(){
      return this.form.avatarUrl? this.$host+this.form.avatarUrl: require('../../assets/images/avatar.jpg');
    }
  },
  data(){
    return{
      courseName: '',
      form: {}
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    updateUserList(){
      window.sessionStorage.setItem("user", JSON.stringify(this.form));
    },
    getUserForm(){
      this.form = JSON.parse(window.sessionStorage.getItem('user'));
    }
  },
  created() {
    this.getUserForm();
  }
}
</script>

<style scoped>

</style>