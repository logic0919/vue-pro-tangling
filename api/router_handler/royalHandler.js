// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_royal',
})
const getAll = (req, res) => {
    let sqlStr = 'select * from royal'
    db.query(sqlStr, (err, results) => {
        if (err) {
            return res.cc(err)
        } else {
            res.send({
                status: 0,
                message: '信息获取成功',
                data: results
            })
        }
    })
}
const getById = (req, res) => {
    const id = req.query.id
    let sqlStr = 'select * from royal where id = ?'
    db.query(sqlStr, id, (err, results) => {
        if (err) {
            return res.cc(err)
        } else if (results.length != 0) {
            res.send({
                    status: 0,
                    message: '信息获取成功',
                    data: results[0]
                })
        }
    })
}
const search = (req, res) => {
    const name = `%${req.query.name}%`
    let sqlStr = 'select * from royal where name LIKE ?'
    db.query(sqlStr, name, (err, results) => {
        if (err) {
            return res.cc(err)
        } else {
            res.send({
                status: 0,
                message: '搜索成功',
                data: results
            })
        }
    })
}

module.exports = { getAll, getById, search }