<template>
  <button @click="logout" class="bg-info">退出</button>
</template>

<script>
export default {
  name: "AHome",
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>