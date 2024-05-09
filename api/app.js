const express = require('express')
const app = express()

app.use((req, res, next) => {
  // 默认为失败。如果成功,不要忘记传入第二个参数0
  res.cc = (err, status = 1) => {
    // console.log(status);
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use((req, res, next) => {
  console.log('hello');
  // 默认为失败。如果成功,不要忘记传入第二个参数0
  next()
})


// // 导入cors允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 全局错误处理中间件
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  // 未知错误
  res.send({
    status: 1,
    message: err.message
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
const router = require('./router')
app.use(router)
app.listen(8080, () => {
  console.log('running')
})
