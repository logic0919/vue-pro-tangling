const jwt = require('jsonwebtoken')
const config = require('../config.js')

const bcryptjs = require('bcryptjs')

// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_royal',
})


// 导入验证格式的函数
const {infoRegTest} = require('../regular.js')

// 注册函数
const register = (req, res) => {
    // 先验证字符串格式
    // 再判断账号是否被占用
    // 最后加入到数据库里
    const regRes = infoRegTest(req.body.id,req.body.pwd)
    if (!regRes.inf) {
        res.cc(regRes.msg)
    } else {
        let sqlStr = 'select * from users where id=?'
        db.query(sqlStr, req.body.id, (err, results) => {
            if (err) {
                return res.cc(err)
            }else if (results.length != 0) {
                return res.cc('该id已被占用')
            } else {
                const id=req.body.id
                const pwd = bcryptjs.hashSync(req.body.pwd, 10)
                sqlStr = 'insert into users (id,pwd) values (?,?)'
                db.query(sqlStr, [id,pwd], (err, results) => {
                    if (err) {
                        return res.cc(err)
                    } else if (results.affectedRows !== 1) {
                        return res.cc('注册失败')
                    } else {
                        return res.cc('注册成功', 0)
                    }
                })
            }
        })
    }
}


// 登录函数
const login = (req, res) => {
    // 先验证字符串格式
    // 判断账号是否存在
    // 验证密码
    // 生成token字符串并相应给客户端
    const regRes = infoRegTest(req.body.id,req.body.pwd)
    if (!regRes.inf) {
        res.cc(regRes.msg)
    } else {
        let sqlStr = 'select * from users where id=?'
        db.query(sqlStr, req.body.id, (err, results) => {
            if (err) {
                return res.cc(err)
            }else if (results.length != 1) {
                return res.cc('账号不存在')
            }else if (!bcryptjs.compareSync(req.body.pwd, results[0].pwd)) {
                return res.cc('密码错误')
            } else {
                const user = { ...req.body, pwd: '' }
                const tokenStr = jwt.sign(user, config.jwtSerectKey, {
                    expiresIn: '11296000'//单位是秒，设置为15天，15*24*60*60=1,296,000
                })
                res.send({
                    status: 0,
                    message: '登录成功',
                    token: 'Bearer ' + tokenStr//Bearer后面的空格不能丢
                }
                )
            }
        })
    }
}


module.exports = { register, login }