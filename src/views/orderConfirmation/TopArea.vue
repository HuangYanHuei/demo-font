<template>
  <div class="top">
    <div class="top__bgcor" />
    <div class="top__header">
      <div class="top__header__back" @click="handleBackClick">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <span class="top__header__title">確認訂單</span>
    </div>
    <router-link to="/address">
      <div class="top__receiver" v-if="addressInfo">
        <div class="top__receiver__title">收貨地址</div>
        <div class="top__receiver__address">{{ addressInfo.city }}{{ addressInfo.detail }}</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">{{ addressInfo.receiver }}</span>
          <span class="top__receiver__info__phone">{{ addressInfo.phone }}</span>
        </div>
        <div class="top__receiver__enter">
          <font-awesome-icon :icon="['fas', 'chevron-left']" rotation="180" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const store = useStore()
    const addressInfo = ref({})
    const handleBackClick = () => { router.back() }
    const getStoreAddress = async () => {
      const id = store.state.user.id
      await store.dispatch('getAddressData', id)
      if (store.state.address) {
        addressInfo.value = store.state.address
      }
      return { addressInfo }
    }
    getStoreAddress()
    return { handleBackClick, addressInfo }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.top {
  min-height: 1.96rem;
  width: 100%;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  a {
    text-decoration: none;
  }

  &__header {
    position: relative;
    padding: 0 .18rem;
    line-height: .665rem;
    font-size: .16rem;
    color: $bgColor;
    text-align: center;

    &__back {
      position: absolute;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: relative;
    height: 1.11rem;
    margin: 0 .18rem;
    padding: 0 .16rem;
    background: $bgColor;
    border-radius: 4px;

    &__title {
      line-height: .52rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__address {
      padding-right: .2rem;
      font-size: .14rem;
      line-height: .2rem;
      color: $content-fontcolor;
    }

    &__info {
      margin-top: .06rem;
      font-size: .12rem;
      line-height: .17rem;
      color: $medium-fontColor;

      &__name {
        margin-right: .06rem;
      }
    }

    &__enter {
      position: absolute;
      font-size: .16rem;
      top: .48rem;
      right: .16rem;
    }
  }
}
</style>
