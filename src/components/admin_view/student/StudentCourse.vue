<template>
  <div class="course-container">
  <!--当前所在位置-->
    <b-breadcrumb>
      <b-breadcrumb-item href="#/welcome">首页</b-breadcrumb-item>
      <b-breadcrumb-item active>学员管理</b-breadcrumb-item>
      <b-breadcrumb-item active>学员列表</b-breadcrumb-item>
      <b-breadcrumb-item active>学员课程</b-breadcrumb-item>
    </b-breadcrumb>

    <!--课程列表-->
    <b-card class="course-list mb-2">
      <div class="d-flex justify-content-between">
        <b-input-group class="student-name mb-2">
          <b-input :placeholder="`学员:${$route.params.name}`"
                   class="form-control" disabled>
          </b-input>
        </b-input-group>
      </div>

      <!--课程信息展示区域-->
      <b-table id="course-table" :per-page="pageSize"
               :current-page="pageNum" :items="courseList"
               :fields="fields" :busy="isBusy"
               class="mt-3" outlined label striped hover>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(#)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(addDate)="data">
          {{ moment(data.item.addDate).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #cell(操作)="data">
          <b-button pill variant="outline-warning" size="sm"
                    v-b-tooltip.hover title="修改分数"
                    v-b-modal.gradeModal @click="setCourseGrade(data.item)">
            评分
          </b-button>
          <b-button pill variant="outline-danger" size="sm"
                    v-b-tooltip.hover title="退选课程"
                    v-b-modal.delete @click="setDeleteId(data.item.id)">
            退选
          </b-button>
        </template>
      </b-table>
      <!--分页-->
      <b-pagination v-model="pageNum" :total-rows="rows"
                    :per-page="pageSize" aria-controls="course-table"
                    @input="pageNumChange" align="center">
      </b-pagination>

      <!--退选-->
      <b-modal id="delete" @ok="deleteStudentCourse">
        是否退选课程
      </b-modal>

      <!--修改课程成绩-->
      <grade-modal @updateCourseList="updateCourseList"
                   :studentCourse="studentCourse"></grade-modal>
    </b-card>
  </div>
</template>

<script>
import GradeModal from '@/components/modal/GradeModal'
export default {
  name: 'StudentCourse',
  components: { GradeModal },
  data() {
    return {
      studentId: '',
      studentCourse: {},
      rows: 0,
      pageNum: 1,
      pageSize: 3,
      courseList: [],
      deleteId:'',
      isBusy: false,
      moment: this.$moment,
      fields: [
        '#',
        {
          key:'id'
        },
        {
          key: 'courseName',
          label: '课程名'
        },
        {
          key: 'headcount',
          label: '人数',
        },
        {
          key: 'duration',
          label: '时长',
        },
        {
          key:'grade',
          label:'分数'
        },
        {
          key: 'teacherName',
          label: '讲师',
        },
        {
          key: 'introduction',
          label: '课程介绍',
        },
        '操作'
      ]
    }
  },
  methods:{
    //刷新
    updateCourseList(){
      this.getCourseList();
    },

    //分页查询课程数据
    pageNumChange(){
      if(this.pageNum != 1 && !this.courseList[(this.pageNum-1)*this.pageSize]) {
        this.toggleCourseList();
      }
    },
    async toggleCourseList(){
      let reqData = await this.$http.get(`/studentCourse/${this.studentId}?pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      if(reqData.success){
        if(this.rows != reqData.result.total){
          this.updateCourseList();
          return;
        }
        let index = (this.pageNum - 1)*this.pageSize;
        reqData.result.courseList.forEach((course, i)=>{
          this.$set(this.courseList, index + i, course);
        })
      }
      this.$toast(reqData.success, reqData.message);
    },

    //获取课程数据
    async getCourseList(){
      this.isBusy = !this.isBusy;
      this.courseList = [];
      this.pageNum = 1;
      let reqData = await this.$http.get(`/studentCourse/${this.studentId}?pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      this.isBusy = !this.isBusy;
      if(reqData.result){
        this.rows = reqData.result.total;
        this.courseList.push(...reqData.result.courseList);
      }
      else{
        this.rows = 0;
      }
    },

    //设置当前选中课程的信息
    setCourseGrade(data){
      this.studentCourse = {id: data.id, grade: data.grade };
    },

    //课程退选
    setDeleteId(id){
      this.deleteId=id;
    },
    async deleteStudentCourse(){
      let reqData = await this.$http.delete(`/studentCourse/${this.deleteId}`);
      this.$toast(reqData.success, reqData.message);
      this.updateCourseList();
    }
  },
  created() {
    this.studentId = this.$route.params.id;
    this.getCourseList();
  }
}
</script>

<style scoped>
.course-container{
  font-size: 14px;
}
.course-list{
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.student-name{
  max-width: 400px;
  min-width: 250px;
}
</style>