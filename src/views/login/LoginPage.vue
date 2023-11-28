<template>
  <div class="wrapper">
    <font-awesome-icon :icon="['fas', 'user']" style="color: #00aeff;" class="wrapper__img"/>
    <form action="">
      <div class="wrapper__input">
        <input class="wrapper__input__content" placeholder="請輸入信箱" v-model="email">
      </div>
      <div class="wrapper__input">
        <input class="wrapper__input__content" placeholder="請輸入密碼" type="password" v-model="password">
      </div>
      <button class="wrapper__login--button" @click="handleLogin" :disabled="isProcessing" type="submit">登入</button>
      <div class="wrapper__login--link" @click="handleRegister">立即註冊</div>
      <Toast v-if="show" :message="toastMessage" />
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import Toast, { useToastEffect } from '../../components/ToastPart'
import authorizationAPI from '../../apis/authorization'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const store = useStore()
  const data = reactive({
    email: '',
    password: ''
  })
  const isProcessing = ref(false)

  const handleLogin = async () => {
    try {
      const { email, password } = data
      if (!email || !password) {
        return showToast('帳號或密碼不能為空')
      }
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(email)) {
        showToast('無效的email')
        return
      }

      isProcessing.value = true

      const response = await authorizationAPI.signIn({
        email: data.email,
        password: data.password
      })
      const responseData = response.data
      if (responseData.status !== 'success') {
        throw new Error(responseData.message)
      }
      localStorage.setItem('token', responseData.token)
      store.commit('changeUserInfo', responseData)
      router.push({ name: 'Home' })
    } catch (error) {
      showToast('登入失敗，帳密不正確')
      isProcessing.value = false
    }
  }

  const { email, password } = toRefs(data)
  return { email, password, handleLogin, isProcessing }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'LoginPage',
  components: { Toast },
  setup () {
    const { showToast, toastMessage, show } = useToastEffect()
    const { email, password, handleLogin, isProcessing } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    return { handleRegister, toastMessage, show, email, password, handleLogin, isProcessing }
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
    font-size: .66rem;
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

  &__login--button {
    width: 100%;
    margin: .16rem 0;
    line-height: .48rem;
    font-size: .16rem;
    border: none;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: $bgColor;
  }

  &__login--link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
