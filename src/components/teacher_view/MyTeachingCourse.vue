<template>
  <div class="mx-auto w-75">
    <b-button class="w-100" variant="warning" v-show="!courseName"
              v-b-modal.courseModal>上传新课程</b-button>
    <b-card class="course flex-grow-0 mt-2"
            v-for="course in courseList" :key="course.id"
            :img-src="getPicUrl(course)" img-width="150" img-height="150" img-alt="课程图片" img-left
            @click="toCourseDetail(course.id)">
      <b-card-title>
        {{ course.courseName }}
      </b-card-title>
      <b-card-text>
        时长：{{ course.duration}}
      </b-card-text>
      <b-card-text class="small text-muted">
        在学人数：{{ course.headcount }}
      </b-card-text>
      <b-card-text class="small text-muted">
        上架时间：{{ $moment(course.addDate).format('YYYY-MM-DD') }}
      </b-card-text>
      <template #footer>
        <small class="text-muted">讲师：{{ course.teacherName }}</small>
      </template>
    </b-card>
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

    <!--课程弹窗-->
    <course-modal :is-edit="false" modal-title="上传新课程" @updateCourseList="getNewCourse"></course-modal>
  </div>
</template>

<script>
import CourseModal from '@/components/modal/CourseModal'
export default {
  name: "MyTeachingCourse",
  components: { CourseModal },
  computed: {
    courseName(){
      return this.$route.query.courseName || ""
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
      let teacherId = JSON.parse(window.sessionStorage.getItem('user')).id;
      let reqData = await this.$http.get(`/course?name=${this.courseName}&&teacherId=${teacherId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);

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
    getNewCourse(){
      this.pageNum = 1;
      this.courseList = [];
      this.getCourseList();
    },
    getMoreCourse(){
      this.pageNum++;
      this.getCourseList();
    },
    toCourseDetail(courseId){
      this.$router.push({ name: 'teachingCourseDetail', params: { courseId } });
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