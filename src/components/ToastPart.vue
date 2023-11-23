<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ToastPart',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { toastMessage, show } = toRefs(toastData)
  return { showToast, toastMessage, show }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: $bgColor;
  font-size: .12rem;
}
</style>
