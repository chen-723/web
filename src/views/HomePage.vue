<template>
  <div style="text-align:center;margin-top:60px;">
    <img v-if="user.avatar_url" :src="user.avatar_url" width="80" height="80" style="border-radius:50%;" />
    <h2>欢迎，{{ user.username }}!</h2>
    <p>邮箱：{{ user.email || '暂无' }}</p>
    <p>注册时间：{{ user.created_at || '未知' }}</p>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/login')
    }
  }
}
</script>