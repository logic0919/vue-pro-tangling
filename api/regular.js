const telReg=/^[0-9]{11}$/
const pwdReg=/^\w{6,16}$/
const QQReg=/^[0-9]{2,20}$/
const nameReg =/^[\u4E00-\u9FA5\uF900-\uFA2D]{2,11}$/

// 因为参数是对象结构而得，所以可以对所有函数进行正则校验
// 上面这句话不是很正确，因为用这种结构的方式，对于登录时，传过来的QQ和name是undefined
// 完善代码：除了报名需要的数据，在另外传入一个数据flag(0表示当前是报名操作，那么QQ和anme不能非空，1表示是登录操作，可以为空)
const infoRegTest = ({ flag, tel, pwd, QQ, name }) => {
    if (flag === 0) {
        if (!QQ) {
            return {
                inf: false,
                msg: 'QQ号格式不正确'
            }
        }
        if (!name) {
            return {
                inf: false,
                msg: '姓名必须2至10位中文字符'
            }
        }
    }
    if (!telReg.test(tel)) {
        return {
            inf: false,
            msg: '手机号应为11位数字'
        }
    }
    if (!pwdReg.test(pwd)) {
        return {
            inf: false,
            msg: '密码应为6至15位字母数字下划线'
        }
    }
    if (QQ && !QQReg.test(QQ)) {
        console.log(!QQ);
        return {
            inf: false,
            msg: 'QQ号格式不正确'
        }
    }
    if (name&&!nameReg.test(name)) {
        return {
            inf: false,
            msg: '姓名应为2至10位中文字符'
        }
    }
    return {
        inf: true,
        msg:'报名或登录信息格式无误'
    }
}
exports.infoRegTest = infoRegTest

