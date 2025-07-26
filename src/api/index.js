import axios from 'axios'

// 根据后端实际地址修改
const baseURL = 'https://111dc5664cn09.vicp.fun/api';  //跑本地也用这个，因为已经映射过了
// const baseURL = 'http://localhost:3000/api'         //这个纯本地
const api = axios.create({
  baseURL,
  timeout: 5000
})

export const login = (username, password) =>
  api.post('/login', { username, password })

// 获取历史消息
export const fetchMessages = () => api.get('/chat/messages')

// 发送消息
export const sendMessage = (payload) =>
  api.post('/chat/messages', payload)