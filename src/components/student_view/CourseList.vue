<template>
  <div class="con">
    <b-card-group class="flex-wrap" deck>
      <b-card class="course flex-grow-0 mt-5"
              v-for="course in courseList" :key="course.id"
              :img-src="getPicUrl(course)" img-height="200" img-width="200" img-alt="课程图片" img-top
              @click="toCourseDetail(course)">
        <b-card-title>
          {{ course.courseName }}
        </b-card-title>
        <b-card-text>
          时长：{{ course.duration}}
        </b-card-text>
<!--        <b-card-text class="small text-muted">-->
<!--          在学人数：{{ course.headcount }}-->
<!--        </b-card-text>-->
<!--        <b-card-text class="small text-muted">-->
<!--          上架时间：{{ $moment(course.addDate).format('YYYY-MM-DD') }}-->
<!--        </b-card-text>-->
        <template #footer>
          <small class="text-muted">讲师：{{ course.teacherName }}</small>
        </template>
      </b-card>
    </b-card-group>
    <div class="mt-3">
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
export default {
  name: "CourseList",
  computed: {
    courseName(){
      return this.$route.query.courseName || ""
    }
  },
  props: {
    isMyCourse: {
      type: Boolean,
      default() {
        return false;
      }
    },
    teacherId: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data(){
    return{
      pageNum: 1,
      pageSize: 4,
      courseTotal: 0,
      courseList: [],
      moreShowBoolean: false,
    }
  },
  methods: {
    getPicUrl(course){
      return course.picUrl? this.$host+course.picUrl: require('../../assets/images/avatar.jpg');
    },
    async getCourseList(){
      let reqData;
      if(this.isMyCourse){
        let userId = JSON.parse(window.sessionStorage.getItem('user')).id;
        reqData = await this.$http.get(`/studentCourse/${userId}?pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      }
      else{
        reqData = await this.$http.get(`/course?name=${this.courseName}&&teacherId=${this.teacherId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      }

      if(reqData.success){
        let courseList = reqData.result.courseList;
        this.courseTotal = reqData.result.total;
        this.courseList.push(...courseList);
        if(this.pageNum*this.pageSize >= this.courseTotal){
          this.moreShowBoolean = false;
        }
        else{
          this.moreShowBoolean = true;
        }
      }
    },
    getMoreCourse(){
      this.pageNum++;
      this.getCourseList();
    },
    toCourseDetail(course){
      let courseId = this.isMyCourse?course.courseId: course.id;
      this.$router.push({ name: 'courseDetail', params: { courseId } });
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
  .con{
    font-size: 16px;
  }
  .course{
    min-width: 200px;
  }
</style>