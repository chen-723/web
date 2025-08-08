<template>
  <div style="text-align:center;margin-top:60px;">
    <!-- 1. 原用户信息 -->
    <img v-if="user.avatar_url" :src="user.avatar_url" width="80" height="80" style="border-radius:50%;" />
    <h2>欢迎，{{ user.username }}!</h2>
    <p>邮箱：{{ user.email || '暂无' }}</p>
    <p>注册时间：{{ user.created_at || '未知' }}</p>
    <button @click="logout">退出登录</button>
    <button @click="loadMessages" style="margin:8px;">刷新消息</button>

    <!-- 2. 聊天区域 -->
    <div style="max-width:500px;margin:40px auto;">
      <!-- 消息列表 -->
      <div
        ref="msgBox"
        style="height:260px;border:1px solid #ccc;border-radius:6px;padding:8px;overflow-y:auto;background:#fafafa;text-align:left;"
      >
        <div v-for="m in messages" :key="m.id" style="margin:4px 0;">
          <b>{{ m.username }}</b> <small style="color:#888;">{{ m.created_at }}</small><br/>
          {{ m.content +'喵~' }}
        </div>
      </div>

      <!-- 输入+发送 -->
      <div style="display:flex;margin-top:8px;">
        <input
          v-model="newMsg"
          @keyup.enter="sendMsg"
          style="flex:1;padding:6px 8px;border:1px solid #ccc;border-radius:4px;"
          placeholder="说点什么..."
        />
        <button @click="sendMsg" style="margin-left:6px;padding:6px 12px;">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMessages, sendMessage } from '@/api/index.js'

export default {
  name: 'HomePage',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      messages: [],
      newMsg: '',
      timer: null,
       autoRefresh: false   // true 开启，false 关闭
    }
  },
  created() {
    // 首次加载 + 每 3 秒自动刷新
    this.loadMessages()
    if (this.autoRefresh) {
    this.timer = setInterval(this.loadMessages, 6000)
    }
  },
  beforeDestroy() {
    // 页面离开时清理定时器
    clearInterval(this.timer)
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/login')
    },
    // 手动/自动刷新消息列表
    loadMessages() {
      fetchMessages()
        .then(res => {
          if (res.data.code === 0) {
            this.messages = res.data.data
            // 滚动到底
            this.$nextTick(() => {
              const box = this.$refs.msgBox
              box && (box.scrollTop = box.scrollHeight)
            })
          }
        })
        .catch(console.error)
    },
    sendMsg() {
      const content = this.newMsg.trim()
      if (!content) return

      const payload = {
        user_id: this.user.id || 1,
        username: this.user.username,
        content
      }

      sendMessage(payload)
        .then(res => {
          if (res.data.code === 0) {
            // 发送后立即刷新
            return this.loadMessages()
          }
          throw new Error(res.data.message)
        })
        .catch(console.error)
        .finally(() => {
          this.newMsg = ''
        })
    }
  }
}
</script>