<template>
  <course-list :isMyCourse="true"></course-list>
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