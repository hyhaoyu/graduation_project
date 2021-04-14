<template>
  <div>
    <b-input-group>
      <b-input placeholder="输入学生姓名"
               v-model="queryName">
      </b-input>
      <b-input-group-append>
        <b-button @click="searchStudent" variant="success">搜索</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-card-group class="" deck>
      <b-card class="mt-2 student-card"
              v-for="(student,index) in studentList" :key="student.id"
              :img-src="getPicUrl(student)" img-width="150" img-height="150" img-alt="头像" img-left>
        <b-card-title>
          {{ student.realName }}
        </b-card-title>
        <b-card-text class="small text-muted">
          性别：{{ getGender(student)}}
        </b-card-text>
        <b-card-text class="small text-muted">
          年龄：{{ student.age }}
        </b-card-text>
        <b-card-text class="small text-muted">
          联系方式：{{ student.phone }}
        </b-card-text>
        <b-card-text>
          分数：{{ getGrade(index)}}
        </b-card-text>
        <b-card-text>
          <b-button variant="info"
                    v-b-modal.gradeModal @click="setCourseGrade(student.id, index)">评分</b-button>
        </b-card-text>
      </b-card>
    </b-card-group>
    <b-button class="w-100" variant="info" @click="getMoreStudent"
              v-if="moreShowBoolean">
      加载更多信息
    </b-button>
    <b-button class="w-100" variant="light"
              v-else>
      已到底部啦！
    </b-button>

    <!--弹框-->
    <grade-modal @updateCourseList="updateStudentGrade"
                 :studentCourse="studentCourse"></grade-modal>
  </div>
</template>

<script>
import GradeModal from '@/components/modal/GradeModal'
export default {
  name: "StudentList",
  components: { GradeModal },
  props: {
    courseId: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data(){
    return{
      gradeList: [],
      queryName: "",
      pageNum: 1,
      pageSize: 4,
      studentTotal: 0,
      studentList: [],
      studentCourse: {},
      index: -1,
      moreShowBoolean: false,
    }
  },
  methods: {
    getGrade(index){
      return this.gradeList[index] && this.gradeList[index].grade || "";
    },
    getPicUrl(student){
      return student.avatarUrl? this.$host+student.avatarUrl: require('../../assets/images/avatar.jpg');
    },
    getGender(student){
      return student.gender? "男":"女";
    },
    async getStudentList(){
      let reqData = await this.$http.get(`/student?name=${this.queryName}&&courseId=${this.courseId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      if(reqData.success){
        let studentList = reqData.result.userList;
        this.studentTotal = reqData.result.total;
        this.studentList.push(...studentList);
        if(this.pageNum*this.pageSize >= this.studentTotal){
          this.moreShowBoolean = false;
        }
        else{
          this.moreShowBoolean = true;
        }

      }
    },
    async getGradeList(){
      let gradeData = await this.$http.get(`/studentCourse?courseId=${this.courseId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      this.gradeList = gradeData.result;
    },
    getMoreStudent(){
      this.pageNum++;
      this.getStudentList();
    },
    searchStudent(){
      this.pageNum = 1;
      this.studentList = [];
      this.getStudentList();
    },

    setCourseGrade(studentId, index){
      let grade = this.getGrade(index);
      this.studentCourse = {userId: studentId,courseId: this.courseId, grade};
      this.index = index;
    },
    updateStudentGrade(){
      this.gradeList[this.index].grade=this.studentCourse.grade;
    }
  },
  created() {
    this.getStudentList();
    this.getGradeList();
    window.addEventListener('scroll',()=>{
      if(!this.moreShowBoolean){
        return;
      }
      const scrollY=document.documentElement.scrollTop || document.body.scrollTop;//滚动条在Y轴上的滚动距离
      const vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;//页面的可视高度（能看见的）
      const allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); //页面的总高度（所有的）
      if(scrollY + vh >= allHeight-1) { //当滚动条滑到页面底部
        this.getMoreStudent();
      }
    })
  }
}
</script>

<style scoped>
  .student-card{
    flex-basis: 46%;
  }
</style>