<script setup>
import { computed, ref } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const reInput = '请再次输入密码'
// 一些表单数据绑定
const clearForm = () => {
  formModel.value.email = ''
  formModel.value.id = ''
  formModel.value.name = ''
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
  await form.value.validate()
  await pwdinp2.value.validate()
  await pwdinp3.value.validate()
  if (pwdinp2.value.formModel.pwd !== pwdinp3.value.formModel.pwd) {
    ElMessage({ message: '两次输入密码不一致', type: 'error' })
    return
  }
  //   const res = await userRegisterService({
  //     name: formModel.value.name,
  //     email: formModel.value.email,
  //     pwd: pwdinp2.value.formModel.pwd
  //   })
  //   if (res.data.status === 200) {
  //     ElMessage({ message: '邮件发送成功，请注意查收', type: 'success' })
  //   } else {
  //     ElMessage({ message: '操作失败，请稍后重试', type: 'error' })
  //   }
}
// 登录函数
const login = async () => {
  await form.value.validate()
  await pwdinp1.value.validate()
  //   const res = await userLoginService({
  //     id: formModel.value.id,
  //     pwd: pwdinp1.value.formModel.pwd
  //   })
  //   if (res.data.status === 200) {
  //     const { token } = res.data.data
  //     const info = res.data.data.user
  //     // 本地过期时间戳
  //     setlocalTime()
  //     // 本地信息+token
  //     setlocalToken(token)
  //     // 仓库信息+token
  //     setAll({ token, ...info, name: info.nick_name })
  //     ElMessage({ message: '登录成功，即将跳转', type: 'success' })
  //     setTimeout(() => {
  //       router.push('/index')
  //     }, 3000)
  //   }
}
const form = ref(null)
const formModel = ref({
  id: '',
  email: '',
  name: ''
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
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
    // {
    //   pattern: /^\d{11}$/,
    //   message: '邮箱必须11位数字',
    //   trigger: 'blur'
    // }
  ],
  name: [
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
  <div class="main">
    <div class="left">
      <img src="/src/assets/login.jpg" alt="" />
    </div>
    <div class="right">
      <div class="form">
        <div class="formMain">
          <div class="logo">
            <img src="/src/assets/logo.jpg" alt="" />
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
              <el-form-item prop="name" class="elinput">
                <el-input v-model="formModel.name" placeholder="请输入昵称">
                </el-input>
              </el-form-item>
              <el-form-item prop="email" class="elinput">
                <el-input
                  v-model="formModel.email"
                  placeholder="请输入邮箱"
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
</template>

<style lang="scss" scoped>
* {
  margin: -8px;
}
.main {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: rgb(243, 243, 243);

  .left {
    width: 60%;
    min-width: 600px;
    // border: 1px solid red;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    overflow: hidden;
    border: 1px solid red;

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
      margin: 0 auto;
      margin-top: 6vh;
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
          height: 50px;
          line-height: 200%;

          // border: 1px solid red;
          img {
            width: 50%;
          }
        }

        .nav {
          height: 40px;

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
            // font-weight: 700;
            // padding-left: 15px;
            // padding-right: 15px;
            line-height: 35px;

            // line-height: 300%;
            &:nth-child(1) {
              margin-right: 10px;
            }
          }
        }

        .login {
          height: 180px;

          .btn {
            // background-color: rgb(255, 45, 45);
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

          // border: 1px solid red;
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
</style>
