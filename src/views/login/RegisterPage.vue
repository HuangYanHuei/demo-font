<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <form action="">
      <div class="wrapper__input">
        <input class="wrapper__input__content" v-model="username" placeholder="請輸入用戶名">
      </div>
      <div class="wrapper__input">
        <input class="wrapper__input__content" v-model="email" placeholder="請輸入信箱" type="email">
      </div>
      <div class="wrapper__input">
        <input class="wrapper__input__content" v-model="password" placeholder="請輸入密碼" type="password">
      </div>
      <div class="wrapper__input">
        <input class="wrapper__input__content" v-model="ensurement" placeholder="確認密碼" type="password">
      </div>
      <button class="wrapper__register--button" @click="handleRegister" :disabled="isProcessing">註冊</button>
    </form>
    <div class="wrapper__register--link" @click="handleLoginClick">已有帳號去登入</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs, ref } from 'vue'
import authorizationAPI from '../../apis/authorization'
import Toast, { useToastEffect } from '../../components/ToastPart'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    email: '',
    password: '',
    ensurement: ''
  })
  const isProcessing = ref(false)

  const handleRegister = async () => {
    try {
      const { username, email, password, ensurement } = data
      if (!username || !email || !password || !ensurement) {
        return showToast('輸入框不能為空')
      } else if (password !== ensurement) {
        data.ensurement = ''
        return showToast('密碼不一致')
      }
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(email)) {
        showToast('無效的email')
        return
      }

      isProcessing.value = true

      const response = await authorizationAPI.signUp({
        name: data.username,
        email: data.email,
        password: data.password,
        passwordCheck: data.ensurement
      })

      const responseData = response.data
      if (responseData.status !== 'success') {
        throw new Error(data.message)
      }
      router.push({ name: 'Login' })
    } catch (error) {
      if (error.response.status === 422) {
        showToast('email已經被註冊')
      }
      data.password = ''
      data.ensurement = ''
      isProcessing.value = false
    }
  }
  const { username, email, password, ensurement } = toRefs(data)
  return { username, email, password, handleRegister, ensurement, isProcessing }
}

const useLoginPageEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}
export default {
  name: 'RegisterPage',
  components: { Toast },
  setup () {
    const { showToast, toastMessage, show } = useToastEffect()
    const { handleLoginClick } = useLoginPageEffect()
    const { username, email, password, handleRegister, ensurement, isProcessing } = useRegisterEffect(showToast)
    return { handleLoginClick, username, email, password, handleRegister, ensurement, toastMessage, show, isProcessing }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  //下列五行實施垂直居中
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 .4rem;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  &__input {
    height: .48rem;
    margin-bottom: .16rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;

    &__content {
      width: 100%;
      line-height: .48rem;
      border: none;
      outline: none;
      background: none;
      color: $content-notice-fontcolor;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__register--button {
    height: .48rem;
    width: 100%;
    margin: .16rem 0;
    font-size: .16rem;
    text-align: center;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    border: none;
    color: $bgColor;
  }

  &__register--link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
