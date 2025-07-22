<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册账号</h2>

      <form @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="请输入用户名" />
        <input v-model="password" type="password" placeholder="请输入密码" />
        <button type="submit">注册</button>
      </form>

      <p v-if="message" :style="{ color: messageColor, marginTop: '1rem' }">
        {{ message }}
      </p>

      <router-link to="/login">返回登录</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      message: '',
      messageColor: 'red'
    }
  },
  methods: {
    async handleRegister() {
      if (!this.username || !this.password) {
        this.message = '用户名和密码不能为空'
        return
      }

      try {
        const res = await axios.post('http://localhost:3000/api/register', {
          username: this.username,
          password: this.password
        })

        if (res.data.code === 0) {
          this.message = '注册成功，正在跳转登录...'
          this.messageColor = 'green'
          setTimeout(() => this.$router.push('/login'), 1500)
        } else {
          this.message = res.data.message
        }
      } catch (err) {
        this.message = '注册失败：' + (err.response?.data?.message || err.message)
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.register-box {
  width: 90rem;
  height: 55rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-box h2 {
  font-size: 3rem;
  color: rgb(144, 129, 241);
  margin-bottom: 4rem;
}

.register-box form {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-box input {
  width: 70%;
  height: 5rem;
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  border: none;
  border-bottom: 1px solid rgb(144, 129, 241);
  background: transparent;
  outline: none;
  color: rgb(144, 129, 241);
}

.register-box button {
  width: 60%;
  height: 5rem;
  margin-top: 4rem;
  font-size: 1.6rem;
  color: #fff;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.register-box button:hover {
  box-shadow: 0 0 2rem -0.5rem rgb(0 0 0 / 15%);
}

.register-box a {
  margin-top: 3rem;
  font-size: 1.4rem;
  color: #666;
  text-decoration: none;
}

.register-box a:hover {
  color: rgb(144, 129, 241);
}
</style>