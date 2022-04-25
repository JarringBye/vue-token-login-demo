<template>
  <div class="user-container">这是登录后的页面</div>
</template>

<script>
export default {
  name: 'UserMain',
  beforeCreate () {
    const config = {
      url: '/apis/userinfo',
      method: 'POST',
      headers: { Authorization: 'bearer ' + localStorage.getItem('token') }
    }
    this.$axios(config)
  }
}
</script>

<style scoped>

</style>
