<template>
  <div class="text-overlay">
    <div class="background-text">{{ eng }}</div>
    <div class="foreground-text">{{ chin }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  chin: String,
  eng: String
})
console.log(props)
</script>

<style scoped>
.text-overlay {
  position: relative;
  display: inline-block;
  margin: 30px;
}

.background-text {
  position: absolute;
  background: -webkit-linear-gradient(90deg, transparent, #f4363f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  font-weight: bold;
  top: 5px;
  left: 30px;
}

.foreground-text {
  position: relative;
  color: rgba(79, 79, 79, 0.8);
  font-size: 30px;
  font-weight: bold;
}
</style>
