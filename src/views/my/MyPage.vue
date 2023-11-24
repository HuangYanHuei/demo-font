<template>
  <div class="my">
    <div class="my__bgcolor"/>
    <div class="my__container">
      <div class="my__top">
        <p class="my__name">{{ user.name }}</p>
      </div>
      <img class="my__img" :src="user.image" alt="">
      <div class="my__option">
        <router-link to="/userInfo">
        <div class="my__optioncontainer">
          <font-awesome-icon :icon="['fas', 'fa-user']" class="my__iconleft"/>
          <p class="my__optionname">修改個人資訊</p>
          <font-awesome-icon :icon="['fas', 'arrow-right']" class="my__iconright"/>
        </div>
        </router-link>
          <router-link to="/address">
          <div class="my__optioncontainer">
            <font-awesome-icon :icon="['fas', 'address-book']" class="my__iconleft"/>
            <p class="my__optionname">修改配送地址</p>
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="my__iconright"/>
          </div>
          </router-link>
        <div class="my__optioncontainer" @click="handleLogoutClick">
          <font-awesome-icon :icon="['fas', 'fa-right-from-bracket']" class="my__iconleft"/>
          <p class="my__optionname">登出</p>
          <font-awesome-icon :icon="['fas', 'arrow-right']" class="my__iconright"/>
        </div>
      </div>
    </div>
  </div>
  <DockerPart/>
</template>

<script>
import DockerPart from '../home/DockerPart'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'MyPage',
  components: { DockerPart },
  setup () {
    const addressInfo = ref({})
    const router = useRouter()
    const user = reactive({
      name: '',
      image: ''
    })
    const store = useStore()
    const { name, image } = store.state.user
    user.name = name
    user.image = image

    const getStoreAddress = async () => {
      const id = store.state.user.id
      await store.dispatch('getAddressData', id)
      if (store.state.address) {
        addressInfo.value = store.state.address
      }
      return { addressInfo }
    }
    getStoreAddress()

    const handleLogoutClick = () => {
      localStorage.removeItem('token')
      router.push({ name: 'Login' })
    }
    return { user, handleLogoutClick }
  }
}
</script>

<style lang="scss" scoped>
.my {
 &__bgcolor {
  min-height: 2.5rem;
  width: 100%;
  background-size: 100% 2rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 1%, #0091FF 50%);
  background-repeat: no-repeat;
 }
 &__container {
  margin: 0 .18rem;
  position: relative;
 }
 &__top{
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  height: 2rem;
  width:100%;
  background: #FFFFFF;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
 }
  &__img {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  z-index:1;
  }
  &__name {
    margin-top: .6rem;
    font-size: .24rem;
    color: #262628;
    letter-spacing: .0019rem;
    text-align: center;
    line-height: .36rem;
  }
  &__option{
  position: absolute;
  top: 1.4rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  a {
    text-decoration:none;
  }
  }
  &__optioncontainer {
    display: flex;
    padding:.15rem .15rem .15rem .15rem;
    color: #262626;
  }
  &__iconleft {
    font-size: .16rem;
    margin-right: .08rem;
  }
  &__iconright {
    font-size: .16rem;
    margin-left: auto;
  }
  &__optionname {
    font-size: .16rem;
    line-height: .16rem;
  }
}
</style>
