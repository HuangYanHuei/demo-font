<template>
  <div class="check">
    <div class="check__total">
      <span class="check__total__chinese">實付金額:</span>
      <span class="check__total__number">&nbsp;<b>${{ calculate.price }}</b></span>
    </div>
    <button class="check__button" @click="() => handleSandClick(true)">
      提交訂單
    </button>
  </div>
  <div class="popup" v-if="isShowPopup">
    <div class="popup__title"><b>確定要送出訂單？</b></div>
    <div class="popup__content">請盡快完成支付，否則將被取消</div>
    <div class="popup__buttons">
      <button class="popup__buttons__cancel" @click="() => handleConfirmOrder(false)">取消訂單
      </button>
      <button class="popup__buttons__sure" @click="() => handleConfirmOrder(true)">
        確認支付
      </button>
    </div>
  </div>
  <div class="mask" v-if="isShowPopup" @click="() => handleSandClick(false)" />
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
import router from '@/router'

const useCartEffect = () => {
  const route = useRoute()
  const store = useStore()
  // parseInt 字串轉成數字
  const shopId = parseInt(route.params.id, 10)
  const { calculate, shopName, productList } = useCommonCartEffect(shopId)
  const isShowPopup = ref(false)

  const handleSandClick = (state) => {
    isShowPopup.value = state
  }

  // 送出訂單
  const handleConfirmOrder = async (status) => {
    const items = []
    for (const i in productList.value) {
      const product = productList.value[i]
      items.push({ productId: parseInt(product.id, 10), quantity: parseInt(product.count, 10) })
    }
    try {
      await store.dispatch('putOrderData', {
        userId: store.state.user.id,
        addressId: store.state.address.id,
        restaurantId: shopId,
        shopname: shopName.value,
        status,
        items: items,
        total: calculate.value.price
      })
      router.push({ name: 'OrderList' })
    } catch (e) {
      console.log(e)
    }
  }

  return { calculate, handleConfirmOrder, handleSandClick, isShowPopup }
}
export default {
  name: 'CheckPart',
  setup () {
    const { calculate, handleSandClick, isShowPopup, handleConfirmOrder } = useCartEffect()
    return { calculate, handleSandClick, isShowPopup, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.check {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  width: 100%;
  background: $bgColor;
  border-top: .01rem solid $content-bgColor;

  &__total {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }

  &__button {
    width: .98rem;
    font-size: .14rem;
    color: $bgColor;
    background: #4FB0F9;
    border: none;
  }
}

.popup {
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0 .37rem;
  padding: .24rem 0;
  text-align: center;
  border-radius: .04rem;
  background: #FFF;
  z-index: 2;

  &__title {
    margin-bottom: .08rem;
    line-height: .25rem;
    font-size: .18rem;
    color: #333333;
  }

  &__content {
    font-size: .14rem;
    margin-bottom: .24rem;
    line-height: .2rem;
    color: #666666;
  }

  &__buttons {
    &__cancel {
      padding: 0 .12rem;
      margin-right: .24rem;
      font-size: .14rem;
      line-height: .32rem;
      border: 1px solid #4FB0F9;
      border-radius: .16rem;
      color: #0091FF;
    }

    &__sure {
      padding: 0 .12rem;
      border: 1px solid #4FB0F9;
      font-size: .14rem;
      line-height: .32rem;
      border-radius: 16px;
      color: #FFF;
      background: #4FB0F9;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 1;
}
</style>
