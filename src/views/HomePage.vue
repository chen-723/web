<template>
  <div style="text-align:center;margin-top:100px;">
    <h1>欢迎，{{ $route.query.username }}！</h1>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
   name: 'HomePage',
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.replace('/login')   // 回登录页
    }
  }
}
</script>