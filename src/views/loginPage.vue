<script setup>
import { computed, ref } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const { setlocalToken, setlocalTime, setAll } = userStore
// import { useRouter } from 'vue-router'
// const router = useRouter()
const reInput = '请再次输入密码'
// 一些表单数据绑定
const clearForm = () => {
  formModel.value.tel = ''
  formModel.value.id = ''
  formModel.value.username = ''
  pwdinp1.value.formModel.pwd = ''
  pwdinp2.value.formModel.pwd = ''
  pwdinp3.value.formModel.pwd = ''
}

// 登录中的密码输入框
const pwdinp1 = ref(null)
// 注册中的密码输入框
const pwdinp2 = ref(null)
const pwdinp3 = ref(null)
// 关于切换选项
const islogin = ref(true)
const switchLogin = () => {
  islogin.value = true
  clearForm()
}
const switchRegister = () => {
  islogin.value = false
  clearForm()
}
const loginClass = computed(() => {
  return islogin.value ? ['active span'] : ['noactive span']
})
const registerClass = computed(() => {
  return islogin.value ? ['noactive span'] : ['active span']
})
// 注册函数
const register = async () => {
  console.log(
    formModel.value.tel,
    formModel.value.username,
    pwdinp2.value.formModel.pwd
  )
  await form.value.validate()
  await pwdinp2.value.validate()
  await pwdinp3.value.validate()
  if (pwdinp2.value.formModel.pwd !== pwdinp3.value.formModel.pwd) {
    ElMessage({ message: '两次输入密码不一致', type: 'error' })
    return
  }
  const res = await userRegisterService(
    formModel.value.tel,
    formModel.value.username,
    pwdinp2.value.formModel.pwd
  )
  if (res.data.status === 0) {
    console.log(res.data.message.userId)
    ElMessageBox.alert(
      `注册成功，您的id是${res.data.message.userId}`,
      '提示',
      '确定'
    )
  } else {
    ElMessage({
      message: res.data.message || '操作失败，请稍后重试',
      type: 'error'
    })
  }
}
// 登录函数
const login = async () => {
  await form.value.validate()
  await pwdinp1.value.validate()
  const res = await userLoginService(
    formModel.value.id,
    pwdinp1.value.formModel.pwd
  )
  if (res.data.status === 0) {
    ElMessage.success('登录成功')
    const data = res.data
    const { token, id, username, avatar } = data
    // 本地过期时间戳
    setlocalTime()
    // 本地信息+token
    setlocalToken(token)
    // // 仓库信息+token
    setAll(id, username, avatar)
    ElMessage({ message: '登录成功，即将跳转', type: 'success' })
    // setTimeout(() => {
    //   router.push('/index')
    // }, 3000)
  }
}
const form = ref(null)
const formModel = ref({
  id: '',
  tel: '',
  username: ''
})
const rules = {
  id: [
    { required: true, message: '请输入id', trigger: 'blur' }
    // {
    //   pattern: /^\d{11}$/,
    //   message: 'id必须11位数字',
    //   trigger: 'blur'
    // }
  ],
  tel: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^\d{11}$/,
      message: '手机号必须11位数字',
      trigger: 'blur'
    }
  ],
  username: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
    // {
    //   pattern: /^\w{6,15}$/,
    //   message: '密码应为6至15位字母数字下划线',
    //   trigger: 'blur'
    // }
  ]
}
</script>
<template>
  <div class="loginPage">
    <div class="main">
      <div class="left">
        <img src="/src/assets/login.png" alt="" />
      </div>
      <div class="right">
        <div class="form">
          <div class="formMain">
            <div class="logo">
              <img src="/src/assets/logo.png" alt="" />
            </div>
            <div class="nav">
              <span @click="switchLogin" :class="loginClass">登录</span>
              <span @click="switchRegister" :class="registerClass">注册</span>
            </div>

            <div class="register" ref="register" v-if="!islogin">
              <el-form
                class="elform"
                :model="formModel"
                :rules="rules"
                ref="form"
              >
                <el-form-item prop="username" class="elinput">
                  <el-input
                    v-model="formModel.username"
                    placeholder="请输入昵称"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="tel" class="elinput">
                  <el-input
                    v-model="formModel.tel"
                    placeholder="请输入手机号"
                  ></el-input>
                </el-form-item>
              </el-form>
              <pwd-input ref="pwdinp2"></pwd-input>
              <pwd-input :info="reInput" ref="pwdinp3"></pwd-input>
              <button @click="register">注册</button>
            </div>

            <div class="login" ref="login" v-if="islogin">
              <el-form
                class="elform"
                :model="formModel"
                :rules="rules"
                ref="form"
              >
                <el-form-item prop="id" class="elinput">
                  <el-input
                    v-model="formModel.id"
                    placeholder="请输入id"
                    :prefix-icon="User"
                  ></el-input>
                </el-form-item>
              </el-form>
              <pwd-input ref="pwdinp1"></pwd-input>
              <button class="btn" @click="login">登录</button>
            </div>
            <h6 class="agree">
              注册登录即表示同意 <i>用户协议</i> 和 <i>隐私政策</i>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  margin: -8px;
  height: 100vh;
  overflow: hidden;
  .main {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    background-color: rgb(243, 243, 243);
    height: 100%;
    .left {
      width: 58%;
      min-width: 600px;
      // border: 1px solid red;
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      width: 40%;
      min-width: 430px;

      .form {
        width: 70%;
        height: 70vh;
        min-height: 430px;
        margin: 0 auto;
        margin-top: 12vh;
        background-color: rgb(255, 255, 255);
        box-shadow: 5px 6px 10px 4px rgb(222, 222, 222);
        padding-top: 50px;
        border-radius: 10px;

        .formMain {
          width: 70%;
          height: 400px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin: 0 auto;

          // border: 1px solid red;
          .logo {
            height: 60px;
            margin-left: -30px;
            // border: 1px solid red;
            img {
              width: 80%;
            }
          }

          .nav {
            height: 40px;
            margin-top: 20px;
            margin-bottom: 20px;
            .active {
              color: rgb(33, 90, 229);
              border-bottom: 2px solid rgb(138, 138, 138);
              border-color: rgb(33, 90, 229);
            }

            .noactive {
              color: rgb(138, 138, 138);
              border-bottom: 2px solid rgb(138, 138, 138);
              border-color: rgb(138, 138, 138);
            }

            .span {
              cursor: pointer;
              display: inline-block;
              width: 36%;
              height: 40px;
              font-size: 15px;
              line-height: 35px;
              &:nth-child(1) {
                margin-right: 10px;
              }
            }
          }

          .login {
            height: 180px;

            .btn {
              font-size: 17px;
              font-weight: 700;
              letter-spacing: 5px;
            }
          }

          .login,
          .register {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            & > input {
              width: 100%;
            }

            button {
              width: 80%;
              margin: 0 auto;
              height: 40px;
              background-color: rgb(33, 90, 229);
              color: rgb(255, 255, 255);
              border-color: transparent;
              border-radius: 3px;
            }
          }

          .agree {
            // height: 10px;
            // border: 1px solid red;
            text-align: center;

            i {
              color: rgb(33, 90, 229);
            }
          }
        }
      }
    }
  }
}
</style>
