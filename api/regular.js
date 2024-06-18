const idReg=/^\w{6,16}$/
const pwdReg=/^\w{6,16}$/

const infoRegTest = (id,pwd) => {
    if (!idReg.test(id)) {
        return {
            inf: false,
            msg: '自定义id应为6至15位字母数字下划线'
        }
    }
    if (!pwdReg.test(pwd)) {
        return {
            inf: false,
            msg: '密码应为6至15位字母数字下划线'
        }
    }
    return {
        inf: true,
        msg:'报名或登录信息格式无误'
    }
}
exports.infoRegTest = infoRegTest

