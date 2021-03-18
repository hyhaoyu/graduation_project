<template>
  <div @mouseenter="clearTimer"
       @mouseleave="startTimer"
       class="alert-msg position-fixed mx-auto text-center alert" :class="alertType" role="alert" v-show="visible">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      message: "",
      visible: false,
      type: 'info',
      duration: 1500,
      onclose: null,
      closed: false,
      timer: null
    }
  },
  computed: {
    alertType() {
      return `alert-${this.type}`;
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  },
  mounted() {
    this.startTimer();
  }
}
</script>

<style scoped>
.alert-msg {
  width: 400px;
  top: 50px;
  right: 0;
  left: 0;
  font-size: 14px;
}
</style>