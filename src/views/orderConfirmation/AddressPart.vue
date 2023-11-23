<!--  -->
<template>
  <div class="wrapper">
    <div class="top">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="top__icon" @click="handleBackClick" />
      <p class="top__title">編輯收貨地址</p>
      <div class="top__save" @click="handleSaveClick">保存
      </div>
    </div>
    <div class="address">
      <form class="address__list">
        <div class="address__city">
          <label for="">所在城市:</label>
          <input type="text" v-model="address.city"/>
        </div>
        <div class="address__detail">
          <label for="">詳細地址:</label>
          <input type="text" v-model="address.detail"/>
        </div>
        <div class="address__Receiver">
          <label for="">收貨人:</label>
          <input type="text" v-model="address.receiver"/>
        </div>
        <div class="address__phone">
          <label for="">聯繫電話:</label>
          <input type="text" v-model="address.phone">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'AddressPart',
  setup () {
    const store = useStore()
    const address = reactive({
      id: '',
      city: '',
      detail: '',
      receiver: '',
      phone: ''
    })
    const handleBackClick = () => {
      router.back()
    }
    const handleSaveClick = async () => {
      const { id, city, detail, receiver, phone } = address
      await store.dispatch('postAddressData', {
        id,
        city,
        detail,
        receiver,
        phone
      })
      // store.commit('changeAddressInfo', { address })
      router.back()
    }
    onMounted(() => {
      const info = store.state.address
      address.id = info.id
      address.city = info.city
      address.detail = info.detail
      address.receiver = info.receiver
      address.phone = info.phone
    })
    return { handleBackClick, handleSaveClick, address }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #F1F1F1;

  .top {
    position: relative;
    padding: 0 .18rem;
    margin-bottom: .12rem;
    display: flex;
    font-size: .16rem;
    line-height: .44rem;
    color: #333;
    background: #FFF;

    &__icon {
      position: absolute;
      top: .14rem;
      color: $search-fontColor;
    }

    &__title {
      margin: auto;
    }

    &__save {
      color: $content-fontcolor;
    }
  }

  .address {
    &__list {
      padding: 0 .18rem;
      font-size: .14rem;
      line-height: .44rem;
      list-style: none;
      background: #FFF;
    }

    div {
      display: flex;
      border-bottom: solid #F1F1F1;

      label {
        font-size: 14px;
        color: #666666;
      }

      input {
        flex:1;
        padding: .05rem;
        font-size: 14px;
        color: #151515;
        line-height: 20px;
        outline: none;
        border: none;
      }
    }
  }
}
</style>
