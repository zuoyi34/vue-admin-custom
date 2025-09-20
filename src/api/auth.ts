import http from './http'

export async function login(payload: { username?: string; phone?: string; password: string }) {
  // backend exposes POST /login
  const res = await http.post('/login', payload)
  return res.data
}
