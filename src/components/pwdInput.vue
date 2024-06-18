<script setup>
import { View, Hide } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { ref, defineExpose } from 'vue'

// 父传子
const props = defineProps({
  info: String
})
console.log(props)

// 关于密码格式验证等
const formModel = ref({
  pwd: ''
})
const rules = {
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' }
    // {
    //   pattern: /^\w{6,15}$/,
    //   message: '密码应为6至15位字母数字下划线',
    //   trigger: 'blur'
    // }
  ]
}
const form = ref(null)
const validate = async () => {
  form.value.validate()
}
defineExpose({
  formModel,
  validate
})
// 关于密码的显示与隐藏
// 默认隐藏
const showPwd = ref(false)
const inpType = computed(() => {
  return showPwd.value ? 'text' : 'password'
})
const changeType = () => {
  showPwd.value = !showPwd.value
}
</script>

<template>
  <div>
    <el-form class="elform" :model="formModel" :rules="rules" ref="form">
      <el-form-item prop="pwd" class="elinput">
        <el-input
          v-model="formModel.pwd"
          :placeholder="info || '请输入密码'"
          :type="inpType"
        >
          <template #append>
            <el-icon v-if="showPwd" @click="changeType"><Hide /></el-icon>
            <el-icon v-else @click="changeType"><View /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
