const jwt = require('jsonwebtoken')
const config = require('./config.js')

const bcryptjs = require('bcryptjs')

// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_db_03_3g',
})


// 导入验证格式的函数
const {infoRegTest} = require('./regular.js')

// 注册函数
const register = (req, res) => {
    // 先验证字符串格式
    // 再判断账号是否被占用
    // 最后加入到数据库里
    const regRes = infoRegTest({flag:0,...req.body})
    if (!regRes.inf) {
        res.cc(regRes.msg)
    } else {
        let sqlStr = 'select * from users where tel=?'
        db.query(sqlStr, req.body.tel, (err, results) => {
            if (err) {
                return res.cc(err)
            }else if (results.length != 0) {
                return res.cc('账号被占用')
            } else {
                const tel = req.body.tel
                const QQ = req.body.QQ
                const name = req.body.name
                const lesson = req.body.lesson
                const direction = req.body.direction
                const gender = req.body.gender
                const pwd = bcryptjs.hashSync(req.body.pwd, 10)
                sqlStr = 'insert into users (tel,QQ,name,lesson,direction,gender,pwd,status) values (?,?,?,?,?,?,?,1)'
                db.query(sqlStr, [tel, QQ, name, lesson, direction, gender, pwd], (err, results) => {
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
    const regRes = infoRegTest({flag:1,...req.body})
    if (!regRes.inf) {
        res.cc(regRes.msg)
    } else {
        let sqlStr = 'select * from users where tel=?'
        db.query(sqlStr, req.body.tel, (err, results) => {
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

// 获取个人信息
const infoGet = (req, res) => {
    // 先验证token，从token中获取手机号（或者手机号作为参数传给后端，但不好实现）
    // 根据手机号在数据库中搜索相应数据
    // 返回数据给前端
    const token = req.query.token
    jwt.verify(token, config.jwtSerectKey, (err,data) => {
        if (err) {
            res.cc(err)
        } else {
            // 从token中获取手机号
            // console.log(data); // { tel: '15592277810', pwd: '', iat: 1707926431, exp: 1707937727 }
            const tel = data.tel
            // 根据手机号在数据库中搜索信息
            let sqlStr = 'select * from users where tel=?'
            db.query(sqlStr, tel, (err, results) => {
                if (err) {
                    return res.cc(err)
                }else if (results.length != 1) {
                    return res.cc('账号不存在')
                }
                // console.log(results);
                /*
                [
                    RowDataPacket {
                        tel: '15592277810',
                        name: '罗辑',
                        pwd: '$2a$10$A/vhpz9OPd4CcAXuqNb.ZujV8l4wfQEV2wbXPRu6nj7Jl8Hr8tLb.',
                        QQ: '1111111111',
                        lesson: 'hhh',
                        direction: '前端',
                        gender: '女'
                    }
                    ]
                */
                else {
                    const info = { ...results[0] }
                    Reflect.deleteProperty(info, 'pwd')//删掉pwd属性，得到的对象才能返回
                    res.cc(info, 0)
                }
            })
        }
    })
}

// 修改个人信息
const infoChange = (req, res) => {
    // 先验证token，从token中获取手机号
    // 根据手机号在数据库中搜索，判断是否有该项数据
    // 如果有，就修改数据
    const token = req.query.token
    jwt.verify(token, config.jwtSerectKey, (err, data) => {
        if (err) {
            res.cc(err)
        } else {
            const tel = data.tel
            let sqlStr = 'select * from users where tel=?'
            db.query(sqlStr, tel, (err, results) => {
                if (err) {
                    return res.cc(err)
                }else if (results.length != 1) {
                    return res.cc('账号不存在')
                } else {
                    const { QQ, name, lesson, gender, direction } = req.body
                    sqlStr = 'update users set QQ=?,name=?,lesson=?,gender=?,direction=? where tel=?'
                    db.query(sqlStr, [QQ, name, lesson, gender, direction, tel], (err, results) => {
                        if (err) {
                            return res.cc(err)
                        }else if (results.affectedRows !== 1) {
                            return res.cc('修改信息失败')
                        } else {
                            return res.cc('修改信息成功', 0)
                        }
                    })
                }
            })
        }
    })
}
const test = (req, res) => {
    console.log(req.query.a);
    console.log(req.query.b);
    return res.cc('test成功', 0)
}
module.exports = { register, login, infoGet, infoChange,test }