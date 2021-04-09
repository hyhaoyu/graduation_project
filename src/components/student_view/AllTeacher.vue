<template>
  <div class="con mx-auto w-75">
    <b-card class="mt-2"
            v-for="teacher in teacherList" :key="teacher.id"
            :img-src="getPicUrl(teacher)" img-width="150" img-alt="头像" img-left
            @click="toTeacherDetail(teacher.id)">
      <b-card-title>
        {{ teacher.realName }}
      </b-card-title>
      <b-card-text>
        性别：{{ getGender(teacher)}}
      </b-card-text>
      <b-card-text class="small text-muted">
        年龄：{{ teacher.age }}
      </b-card-text>
      <b-card-text class="small text-muted">
        介绍：{{ teacher.introduction }}
      </b-card-text>
    </b-card>
    <b-button class="w-100" variant="info" @click="getMoreTeacher"
              v-if="moreShowBoolean">
      加载更多信息
    </b-button>
    <b-button class="w-100" variant="light"
              v-else>
      已到底部啦！
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AllTeacher",
  data(){
    return{
      pageNum: 1,
      pageSize: 4,
      teacherTotal: 0,
      teacherList: [],
      moreShowBoolean: true,
    }
  },
  methods: {
    getPicUrl(teacher){
      return teacher.avatarUrl? this.$host+teacher.avatarUrl: require('../../assets/images/avatar.jpg');
    },
    getGender(teacher){
      return teacher.gender? "男":"女";
    },
    async getTeacherList(){
      let reqData = await this.$http.get(`/teacher?pageNum=${this.pageNum}&&pageSize=${this.pageSize}`);

      if(reqData.success){
        let teacherList = reqData.result.userList;
        this.teacherTotal = reqData.result.total;
        this.teacherList.push(...teacherList);
        if(this.pageNum*this.pageSize >= this.teacherTotal){
          this.moreShowBoolean = false;
        }
        else{
          this.moreShowBoolean = true;
        }
      }
    },
    getMoreTeacher(){
      this.pageNum++;
      this.getTeacherList();
    },
    toTeacherDetail(teacherId){
      this.$router.push({ name: 'courseDetail', params: { teacherId } });
    }
  },
  created() {
    this.getTeacherList();
    window.addEventListener('scroll',()=>{
      if(!this.moreShowBoolean){
        return;
      }
      const scrollY=document.documentElement.scrollTop || document.body.scrollTop;//滚动条在Y轴上的滚动距离
      const vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;//页面的可视高度（能看见的）
      const allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); //页面的总高度（所有的）
      if(scrollY + vh >= allHeight-1) { //当滚动条滑到页面底部
        this.getMoreTeacher();
      }
    })
  }
}
</script>

<style scoped>
  .con{
    font-size: 14px;
  }
</style>