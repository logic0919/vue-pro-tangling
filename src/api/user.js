import request from '@/utils/request'
const userLoginService = (id, pwd) => {
  return request.post('/user/login', { id, pwd })
}
const userRegisterService = (tel, username, pwd) => {
  return request.post('/user/register', { tel, username, pwd })
}
const userInfoService = () => {
  return request.get('/user/info')
}
export { userLoginService, userRegisterService, userInfoService }
