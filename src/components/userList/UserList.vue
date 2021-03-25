<template>
  <!--用户列表-->
  <b-card class="user-list mb-2">
    <!--搜索框区域-->
    <div class="d-flex justify-content-between">
      <b-input-group class="search mb-2">
        <b-input placeholder="输入用户名"
                 v-model="queryName"
                 class="form-control">
        </b-input>
        <b-input-group-append>
          <b-button @click="searchUser" variant="success">搜索</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="success" size="sm"
                v-b-modal.modal @click="setModalName(false)">
        添加用户
      </b-button>
    </div>
    <!--用户信息展示区域-->
    <b-table id="user-table" :per-page="pageSize"
             :current-page="pageNum" :items="userList"
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
      <template #cell(gender)="data">
        {{ data.item.gender == 0?'女':'男' }}
      </template>
      <template #cell(registrationDate)="data">
        {{ moment(data.item.registrationDate).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #cell(操作)="data">
        <b-button pill variant="outline-success" size="sm"
                  v-b-tooltip.hover title="查看课程"
                  :to="{name:`${role}_course`, params:{id:data.item.id, name:data.item.realName}}">
          课程
        </b-button>
        <b-button pill variant="outline-warning" size="sm"
                  v-b-tooltip.hover title="修改信息"
                  v-b-modal.modal @click="setModalName(true, data.item)">
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
                  :per-page="pageSize" aria-controls="user-table"
                  @input="pageNumChange" align="center">
    </b-pagination>
    <!--用户信息 对话框-->
    <UserFormModal :is-edit="isEdit" :modal-title="modalTitle" :form="form" :role="role"
               @updateUserList="updateUserList"></UserFormModal>

    <b-modal id="delete" @ok="deleteUser">
      是否删除该用户
    </b-modal>
  </b-card>
</template>

<script>
import UserFormModal from '@/components/modal/UserFormModal'

export default {
  name: "UserList",
  components:{
    UserFormModal
  },
  props:{
    role: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      queryName: '',
      rows: 0,
      pageNum: 1,
      pageSize: 3,
      userList: [],
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
          key: 'username',
          label: '用户名'
        },
        {
          key: 'realName',
          label: '姓名',
        },
        {
          key: 'gender',
          label: '性别',
        },
        {
          key: 'age',
          label: '年龄',
        },
        {
          key: 'phone',
          label: '联系方式',
        },
        {
          key: 'registrationDate',
          label: '注册时间'
        },
        '操作'
      ]
    }
  },
  methods:{
    //查询用户数据
    searchUser(){
      this.getUserList();
    },
    //刷新
    updateUserList(){
      this.queryName = '';
      this.getUserList();
    },

    //分页查询用户数据
    pageNumChange(){
      if(this.pageNum != 1 && !this.userList[(this.pageNum-1)*this.pageSize]) {
        this.toggleUserList();
      }
    },
    async toggleUserList(){
      let reqData = await this.$http.get(`${this.role}?name=${this.queryName}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      if(reqData.success){
        if(this.rows != reqData.result.total){
          this.updateUserList();
          return;
        }
        let index = (this.pageNum - 1)*this.pageSize;
        reqData.result.userList.forEach((user, i)=>{
          this.$set(this.userList, index + i, user);
        })
      }
      this.$toast(reqData.success, reqData.message);
    },

    //获取用户数据
    async getUserList(){
      this.isBusy = !this.isBusy;
      this.userList = [];
      this.pageNum = 1;
      let reqData = await this.$http.get(`${this.role}?name=${this.queryName}&&pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);
      this.isBusy = !this.isBusy;
      if(reqData.result){
        this.rows = reqData.result.total;
        this.userList.push(...reqData.result.userList);
      }
      else{
        this.rows = 0;
      }
      this.queryName && this.$toast(reqData.success, reqData.message);
    },

    // 切换modal
    setModalName(isEdit, form = {}){
      this.form = {...form};
      this.form.registrationDate=this.$moment(this.form.registrationDate).format('YYYY-MM-DD HH:mm:ss');
      this.isEdit = isEdit;
      this.modalTitle = isEdit?'修改用户信息':'用户注册';
    },
    //删除用户
    setDeleteId(id){
      this.deleteId=id;
    },
    async deleteUser(){
      let reqData = await this.$http.delete(`${this.role}/${this.deleteId}`);

      this.$toast(reqData.success, reqData.message);
      this.updateUserList();
    }
  },
  created() {
    this.updateUserList();
  }
}
</script>

<style scoped>
  .user-list{
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  .search{
    max-width: 400px;
    min-width: 250px;
  }
</style>