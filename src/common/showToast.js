const showToast = function(isSuccess, message) {
  this.$bvToast.toast(message, {
    variant: isSuccess?"success":"danger",
    solid: true,
    toaster: "b-toaster-top-center",
    autoHideDelay: 1500
  });
}
export default showToast