<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">培训机构</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">首页</b-nav-item>
          <b-nav-item href="#">我的课程</b-nav-item>
          <b-nav-item href="#">机构讲师</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="输入课程名" v-model="courseName"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="getCourseList(true)">搜索</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>我的</em>
            </template>
            <b-dropdown-item href="#">个人信息</b-dropdown-item>
            <b-dropdown-item href="#">退出登录</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <course-list :course-group="courseGroup"></course-list>
    <div class="w-75 mx-auto mt-3">
      <b-button class="w-100" variant="info" @click="getMoreCourse"
                v-if="moreShowBoolean">
        加载更多课程
      </b-button>
      <b-button class="w-100" variant="light"
                v-else>
        已到底部啦！
      </b-button>
    </div>
  </div>
</template>

<script>
import CourseList from '@/components/student_view/CourseList'
export default {
  name: "SHome",
  components: { CourseList },
  data(){
    return{
      courseName: "",
      teacherId: "",
      pageNum: 1,
      pageSize: 4,
      courseTotal: 0,
      courseGroup: [],
      moreShowBoolean: true,
    }
  },
  methods: {
    async getCourseList(isNewSearch = false){
      if(isNewSearch) {
        this.pageNum = 1;
        this.courseGroup = [];
      }
      let reqData = await this.$http.get(`/course?name=${this.courseName}&&teacherId=${this.teacherId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      let courseList = reqData.result.courseList;
      this.courseTotal = reqData.result.total;
      this.courseGroup.push(courseList);
      if(this.pageNum*this.pageSize >= this.courseTotal){
        this.moreShowBoolean = false;
      }
      else{
        this.moreShowBoolean = true;
      }
    },
    getMoreCourse(){
      this.pageNum++;
      this.getCourseList();
    }
  },
  created() {
    this.getCourseList();
    window.addEventListener('scroll',()=>{
      if(!this.moreShowBoolean){
        return;
      }
      const scrollY=document.documentElement.scrollTop || document.body.scrollTop;//滚动条在Y轴上的滚动距离
      const vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;//页面的可视高度（能看见的）
      const allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); //页面的总高度（所有的）
      if(scrollY + vh >= allHeight-1) { //当滚动条滑到页面底部
        this.getMoreCourse();
      }
    })
  }
}
</script>

<style scoped>

</style>