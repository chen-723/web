<template>
  <div class="box">
    <!-- 左侧图片 -->
    <div class="left"></div>

    <!-- 右侧注册表单 -->
    <div class="right">
      <h4>注 册</h4>

      <form @submit.prevent="handleRegister">
        <input v-model="username" class="acc" type="text" placeholder="用户名" />
        <input v-model="password" class="acc" type="password" placeholder="密码" />
        <input v-model="email"    class="acc" type="email" placeholder="邮箱（可选）" />
        <input v-model="avatar"   class="acc" type="text"  placeholder="头像URL(可选)" />
        <input class="submit" type="submit" value="注册" />
      </form>

      <div class="fn">
        <router-link to="/login">返回登录</router-link>
        <a href="javascript:;">找回密码</a>
      </div>

      <p v-if="message" :style="{ color: messageColor, marginTop: '1.5rem', fontSize: '1.4rem' }">
        {{ message }}
      </p>
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
      email: '',
      avatar: '',
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
        const res = await axios.post('https://111dc5664cn09.vicp.fun/api/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          avatar_url: this.avatar
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

<style>
/* === 全局背景 === */
html {
  font-size: 8px;
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
/* ====== 登录/注册共用外观 ====== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::selection {
  color: #fff;
  background-color: rgb(144, 129, 240);
}

.box {
  display: flex;
  width: 90rem;
  height: 60rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

/* 左侧图片 */
.box .left {
  width: 40%;
  height: 100%;
  position: relative;
  border-radius: 1.5rem 0 0 1.5rem;
  overflow: hidden;
}
.box .left::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/login-bg.png");
  background-size: cover;
  background-position: center;
  opacity: 0.8;
}

/* 右侧表单 */
.box .right {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .right h4 {
  color: rgb(144, 129, 241);
  font-size: 2rem;
  margin-top: 3rem;
}
.box .right form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.box .right .acc {
  outline: none;
  width: 80%;
  height: 5rem;
  font-size: 1.6rem;
  margin-top: 3.5rem;
  padding: 1rem 0 0 1.6rem;
  border: none;
  border-bottom: 1px solid rgb(144, 129, 241);
  color: rgb(144, 129, 241);
  background-color: transparent;
}
.right .acc:focus {
  color: rgb(144, 129, 241);
}
.right .submit {
  width: 60%;
  height: 5rem;
  color: #f6f6f6;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  margin: 5rem 0 0 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.right .submit:hover {
  box-shadow: 0 0 2rem -0.5rem rgb(0 0 0 / 15%);
}
.right .fn {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 1rem;
}
.right .fn a {
  font-size: 1.3rem;
  margin-top: 3rem;
  padding: 1rem 2rem;
  color: #666;
  text-decoration: none;
}
.right .fn a:hover {
  color: rgb(144, 129, 241);
}
</style>