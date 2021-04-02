<template>
  <!--用户列表-->
  <b-card class="course-list mb-2">
    <!--搜索框区域-->
    <div class="d-flex justify-content-between">
      <b-input-group class="search mb-2">
        <b-input placeholder="输入课程名"
                 v-model="queryName"
                 class="form-control">
        </b-input>
        <b-input-group-append>
          <b-button @click="searchCourse" variant="success">搜索</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="success" size="sm"
                v-b-modal.courseModal @click="setModalName(false)">
        添加课程
      </b-button>
    </div>
    <!--用户信息展示区域-->
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
        <b-button pill variant="outline-success" size="sm"
                  v-b-tooltip.hover title="查看课程学员"
                  :to="{name:`course_student`, params:{id:data.item.id, name:data.item.courseName}}">
          学员
        </b-button>
        <b-button pill variant="outline-warning" size="sm"
                  v-b-tooltip.hover title="修改信息"
                  v-b-modal.courseModal @click="setModalName(true, data.item)">
          修改
        </b-button>
        <b-button pill variant="outline-danger" size="sm"
                  v-b-tooltip.hover title="删除"
                  v-b-modal.delete @click="setDeleteId(data.item.id)">
          删除
        </b-button>
      </template>
    </b-table>
    <!--分页-->
    <b-pagination v-model="pageNum" :total-rows="rows"
                  :per-page="pageSize" aria-controls="course-table"
                  @input="pageNumChange" align="center">
    </b-pagination>

    <CourseModal :is-edit="isEdit" :modal-title="modalTitle" :form="form"
                   @updateCourseList="updateCourseList"></CourseModal>

    <b-modal id="delete" @ok="deleteCourse">
      是否删除该课程
    </b-modal>
  </b-card>
</template>

<script>
import CourseModal from '@/components/modal/CourseModal'

export default {
  name: "CourseList",
  components:{
    CourseModal
  },
  computed:{
    teacherId(){
      if(this.$route.params.id){
        return this.$route.params.id;
      }
      else{
        return "";
      }
    }
  },
  data() {
    return {
      queryName: '',
      rows: 0,
      pageNum: 1,
      pageSize: 3,
      courseList: [],
      modalTitle: '',
      form:{},
      deleteId:'',
      isBusy: false,
      isEdit: false,
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
          key: 'teacherName',
          label: '讲师',
        },
        {
          key: 'introduction',
          label: '课程介绍',
        },
        {
          key: 'addDate',
          label: '上架时间'
        },
        '操作'
      ]
    }
  },
  methods:{
    //查询课程数据
    searchCourse(){
      this.getCourseList();
    },
    //刷新
    updateCourseList(){
      this.queryName = '';
      this.getCourseList();
    },

    //分页查询课程数据
    pageNumChange(){
      if(this.pageNum != 1 && !this.courseList[(this.pageNum-1)*this.pageSize]) {
        this.toggleCourseList();
      }
    },
    async toggleCourseList(){
      let reqData = await this.$http.get(`/course?name=${this.queryName}&&teacherId=${this.teacherId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
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
      let reqData = await this.$http.get(`/course?name=${this.queryName}&&teacherId=${this.teacherId}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      this.isBusy = !this.isBusy;
      if(reqData.result){
        this.rows = reqData.result.total;
        this.courseList.push(...reqData.result.courseList);
      }
      else{
        this.rows = 0;
      }
      this.queryName && this.$toast(reqData.success, reqData.message);
    },

    // 切换modal
    setModalName(isEdit, form = {}){
      this.form = {
        id: form.id,
        courseName: form.courseName,
        duration: form.duration,
        introduction: form.introduction,
        picUrl: form.picUrl
      };
      this.isEdit = isEdit;
      this.modalTitle = isEdit?'修改课程信息':'添加课程';
    },

    //删除课程
    setDeleteId(id){
      this.deleteId=id;
    },
    async deleteCourse(){
      let reqData = await this.$http.delete(`/course/${this.deleteId}`);

      this.$toast(reqData.success, reqData.message);
      this.updateCourseList();
    }
  },
  created() {
    this.updateCourseList();
  }
}
</script>

<style scoped>
.course-list{
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.search{
  max-width: 400px;
  min-width: 250px;
}
</style>