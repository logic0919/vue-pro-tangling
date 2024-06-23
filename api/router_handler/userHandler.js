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
    let sqlStr = 'select * from user where tel=?'
    db.query(sqlStr, req.body.tel, (err, results) => {
        if (err) {
            return res.cc(err)
        } else if (results.length != 0) {
            console.log(results)
            console.log(results.length);
            return res.cc('该tel已被占用')
        } else {
            const tel = req.body.tel
            const username= req.body.username
            const pwd = bcryptjs.hashSync(req.body.pwd, 10)
            sqlStr = 'insert into user (tel,username,pwd) values (?,?,?)'
            db.query(sqlStr, [tel,username,pwd], (err, results) => {
                if (err) {
                    return res.cc(err)
                } else if (results.affectedRows !== 1) {
                    return res.cc('注册失败')
                } else {
                    const userId = results.insertId
                    return res.cc({ message: '注册成功', userId: userId }, 0)
                }
            })
        }
    })
}

// 登录函数
const login = (req, res) => {
    // 先验证字符串格式
    // 判断账号是否存在
    // 验证密码
    // 生成token字符串并相应给客户端
    console.log(req.body);
    let sqlStr = 'select * from user where id=?'

db.query(sqlStr, req.body.id, (err, results) => {
    if (err) {
        return res.cc(err);
    } else if (results.length != 1) {
        return res.cc('账号不存在');
    } else if (!bcryptjs.compareSync(req.body.pwd, results[0].pwd)) {
        return res.cc('密码错误');
    } else {
        // 查询用户的username和avatar信息
        const userInfoQuery = 'SELECT username, avatar FROM user WHERE id = ?';
        db.query(userInfoQuery, [req.body.id], (err, userResults) => {
            if (err) {
                return res.cc(err);
            }
            
            if (userResults.length != 1) {
                return res.cc('获取用户信息失败');
            }

            const user = { ...req.body, pwd: '' };
            const tokenStr = jwt.sign(user, config.jwtSerectKey, {
                expiresIn: '1296000' // 单位是秒，设置为15天，15*24*60*60=1,296,000
            });
            res.send({
                status: 0,
                message: '登录成功',
                id: req.body.id,
                username: userResults[0].username,
                avatar: userResults[0].avatar,
                token: 'Bearer ' + tokenStr // Bearer后面的空格不能丢
            });
        });
    }
});

}
// 获取用户信息
const info = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ status: 1, message: '未授权，没有提供token' });
    }

    // 解析 token
    jwt.verify(token, config.jwtSerectKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ status: 1, message: '无效的token' });
        }

        const userId = decoded.id; // 假设 token 中包含用户ID

        // 查询用户信息
        const userInfoQuery = 'SELECT id, username, avatar FROM user WHERE id = ?';
        db.query(userInfoQuery, [userId], (err, results) => {
            if (err) {
                return res.status(500).send({ status: 1, message: '查询用户信息失败' });
            }

            if (results.length != 1) {
                return res.status(404).send({ status: 1, message: '用户信息不存在' });
            }

            const userInfo = results[0];
            res.send({
                status: 0,
                message: '获取用户信息成功',
                data: userInfo
            });
        });
    });
}

module.exports = { register, login,info }