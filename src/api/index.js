import axios from 'axios'

// 根据后端实际地址修改
const baseURL = 'https://111dc5664cn09.vicp.fun/api'

const api = axios.create({
  baseURL,
  timeout: 5000
})

export const login = (username, password) =>
  api.post('/login', { username, password })