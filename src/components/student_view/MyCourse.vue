<template>
  <div class="mx-auto w-75">
    <course-list :isMyCourse="true"></course-list>
  </div>
</template>

<script>
import CourseList from '@/components/student_view/CourseList'
export default {
name: "MyCourse",
  components: { CourseList }
}
</script>

<style scoped>

</style>