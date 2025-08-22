<template>
  <div class="box">
    <div class="left"></div>
    <div class="right">
      <h4>登 录</h4>
      <form @submit.prevent="handleLogin">
        <input
          v-model="username"
          class="acc"
          type="text"
          placeholder="用户名"
        />
        <input
          v-model="password"
          class="acc"
          type="password"
          placeholder="密码"
        />
        <input class="submit" type="submit" value="Login" />
      </form>

      <div class="fn">
        <router-link to="/register">注册账号</router-link>
        <a href="javascript:;">找回密码</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'

export default {
  name: 'LoginBox',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
         alert('请输入账号和密码')
       return
         }
      try {
        const { data } = await login(this.username, this.password)

         // 1️⃣ 保存 token（如果后端给了）
         localStorage.setItem('token', data.token || 'fake-token')
        // 2️⃣ 保存用户名
        localStorage.setItem('username', this.username)
        localStorage.setItem('token', data.token || 'fake-token')
        localStorage.setItem('user', JSON.stringify(data.user))
         // 3️⃣ 跳首页（用 replace 避免回退）
         this.$router.replace('/home')
         } catch (err) {
           alert('登录失败：' + (err.response?.data?.message || err.message))
      }
    }
  }
}
</script>
<style>
/* 全局样式：写在组件里，但无 scoped 限制 */
html {
  font-size: 10px;
}

html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>
<style scoped>

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
}
/* ========= 下面是你原来的完整 CSS ========= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 8px;
}

html::before {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

::selection {
  color: #fff;
  background-color: rgb(144, 129, 240);
}

.box {
   display: flex;
  width: 80rem;          /* 比原来窄一点 */
  height: 65rem;         /* 明显加高 */
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .box .left  { width: 40%; }
.box .right { width: 60%; }
}

.box .left {
  position: relative;
  width: 35%;
  height: 100%;
  background-color: skyblue;
}

.box .left::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/1726886329561.jpg");
  background-size: cover;
  opacity: 80%;
}

.box .right {
  display: flex;
  width: 65%;
  flex-direction: column;
  align-items: center;
}

.box .right h4 {
  color: rgb(144, 129, 241);
  font-size: 3rem;
  margin-top: 5rem;
}

.box .right form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box .right form .acc {
  outline: none;
  width: 80%;
  height: 5rem;
  font-size: 1.6rem;
  margin-top: 5rem;
  padding: 1rem 0 0 1.6rem;
  border: none;
  border-bottom: 1px solid rgb(144, 129, 241);
  color: rgb(144, 129, 241);
  background-color: transparent;
}

.right form .acc:focus {
  outline: none;
  color: rgb(144, 129, 241);
  padding: 1rem 0 0 1.6rem;
}

.right .submit {
  width: 60%;
  height: 5rem;
  color: #f6f6f6;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  margin: 6rem 0 0 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.right .submit:hover {
  box-shadow: 0 0 2rem -0.5rem rgb(0 0 0 / 15%);
}

.right .fn {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 70%;
}

.right .fn a {
  font-size: 1.3rem;
  margin-top: 5rem;
  padding: 1rem 2rem;
  color: #666;
  text-decoration: none;
}

.right .fn a:hover {
  color: rgb(144, 129, 241);
}
.box {
  display: flex;
  width: 90rem;
  height: 55rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 600px) {
  .box {
    /* 原来的居中保持不动，只追加 scale */
    transform: translate(-50%, -50%) scale(0.5);
    transform-origin: center center;
  }
}
</style>
