<template>
  <div class="mask" v-if="showCart && calculate.total > 0" @click="changeCartAppear" />
  <div class="cart">
    <div class="product" v-if="showCart && calculate.total > 0">
      <div class="product__top">
        <div class="product__top__icon" @click="changeAllCartItemCheck(calculate.totalcheck)">
          <font-awesome-icon :icon="['fa', 'circle-check']" class="faCheckIcon" v-if="calculate.totalcheck" />
          <font-awesome-icon :icon="['far', 'circle-check']" class="farCheckIcon" v-else />
        </div>
        <span class="product__top__selectall" @click="changeAllCartItemCheck(calculate.totalcheck)">全選</span>
        <span class="product__top__clear" @click="CartItemClear">清空購物車</span>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item">
          <div class="product__item__icon" @click="() => changeCartItemCheck(item.id)">
            <font-awesome-icon :icon="['fa', 'circle-check']" v-if="item.check === true" class="faCheckIcon" />
            <font-awesome-icon :icon="['far', 'circle-check']" v-else class="farCheckIcon" />
          </div>
          <img class="product__item__img" :src="item.image" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">$</span>{{ item.price }}
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus"
              @click="() => { changeCartItemInfo(shopId, item.id, item, -1) }">-</span>
            {{ getProductCartCount(shopId, item.id) }}
            <span class="product__number__plus" @click="() => { changeCartItemInfo(shopId, item.id, item, 1) }">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__img" @click="changeCartAppear">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        <div class="check__img__tag">{{ calculate.total }}</div>
      </div>
      <div class="check__total">
        <span class="check__total__chinese">總計:</span>
        <span class="check__total__number">${{ calculate.price }}</span>
      </div>
      <button class="check__button" v-show="calculate.price > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去結算
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 取得購物車信息邏輯
const useCartEffect = (shopId) => {
  const { cartList, productList, changeCartItemInfo, calculate } = useCommonCartEffect(shopId)
  const store = useStore()
  const showCart = ref(false)

  // 每個商品的數量
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }

  // check按鈕邏輯
  const changeCartItemCheck = (productId) => {
    store.commit('changeCartItemCheck', { shopId, productId })
  }

  // 清空購物車
  const CartItemClear = () => {
    showCart.value = false
    store.commit('CartItemClear', { shopId })
  }

  // 全選按鈕邏輯
  const changeAllCartItemCheck = (isProductListCheckAll) => {
    store.commit('changeAllCartItemCheck', { shopId, isProductListCheckAll })
  }

  // 打開或關閉購物清單按鈕，而且購物清單要有東西才給打開
  const changeCartAppear = () => { showCart.value = !showCart.value }

  return { calculate, productList, getProductCartCount, changeCartItemInfo, changeCartItemCheck, CartItemClear, changeAllCartItemCheck, cartList, changeCartAppear, showCart }
}

export default {
  name: 'CartPage',
  setup () {
    const route = useRoute()
    const shopId = route.params.id

    const { calculate, productList, getProductCartCount, changeCartItemInfo, changeCartItemCheck, CartItemClear, changeAllCartItemCheck, cartList, changeCartAppear, showCart } = useCartEffect(shopId)

    return {
      calculate, productList, getProductCartCount, shopId, changeCartItemInfo, changeCartItemCheck, CartItemClear, changeAllCartItemCheck, cartList, changeCartAppear, showCart
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;

  .product {
    overflow-y: scroll;
    background: $bgColor;

    &__top {
      display: flex;
      align-items: center;
      height: .52rem;
      padding: 0 .18rem 0 .184rem;
      border-bottom: .01rem solid $content-bgColor;

      &__icon {
        display: flex;
        align-items: center;
        padding-left: .004rem;
        font-size: .19rem;

        .faCheckIcon {
          color: $btn-bgColor;
        }

        .farCheckIcon {
          color: $medium-fontColor;
        }
      }

      &__selectall {
        margin-left: .084rem;
        font-size: .14rem;
        color: $content-fontcolor;
      }

      &__clear {
        margin-left: auto;
        font-size: .14rem;
        color: $content-fontcolor;
      }
    }

    &__item {
      position: relative;
      display: flex;
      padding: .12rem 0;
      margin: 0 .18rem;
      border-bottom: .01rem solid $content-bgColor;

      &__detail {
        overflow: hidden;
      }

      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .164rem 0 .004rem;
        font-size: .19rem;

        .faCheckIcon {
          color: $btn-bgColor;
        }

        .farCheckIcon {
          color: $medium-fontColor;
        }
      }

      &__img {
        text-align: center;
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;
      }

      &__title {
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }

      &__price {
        margin: .06rem 0 0 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $hightlight-fontColor;
      }

      &__yen {
        font-size: .12rem;
      }

      &__origin {
        margin-left: .06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }

      .product__number {
        position: absolute;
        right: 0;
        bottom: .29rem;
        font-size: .12rem;

        &__minus,
        &__plus {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          line-height: .2rem;
          border-radius: 50%;
          font-size: .12rem;
          text-align: center;
        }

        &__minus {
          border: .01rem solid $medium-fontColor;
          color: $medium-fontColor;
          margin-right: .05rem;
        }

        &__plus {
          border: .01rem solid $btn-bgColor;
          background: $btn-bgColor;
          color: $bgColor;
          margin-left: .05rem;
        }
      }
    }
  }

  .check {
    display: flex;
    height: .49rem;
    width: 100%;
    background: $bgColor;
    border-top: .01rem solid $content-bgColor;

    &__img {
      position: relative;
      width: .76rem;
      font-size: .28rem;
      text-align: center;
      line-height: .49rem;
      color: #4FB0F9;

      &__tag {
        position: absolute;
        top: 0;
        right: .1rem;
        height: .2rem;
        width: .2rem;
        font-size: .12rem;
        text-align: center;
        line-height: .2rem;
        border-radius: 50%;
        color: $bgColor;
        background: $hightlight-fontColor;
        transform: scale(0.5);
      }
    }

    &__total {
      flex: 1;
      display: flex;
      justify-content: left;
      align-items: center;
      padding-left: .08rem;

      &__chinese {
        font-size: .12rem;
        color: $content-fontcolor;
        margin-right: .05rem;
      }

      &__number {
        font-size: .18rem;
        color: $hightlight-fontColor;
      }
    }

    &__button {
      width: .98rem;
      font-size: .14rem;
      background: #4FB0F9;
      border: none;

      a {
        color: $bgColor;
        text-decoration: none;
      }
    }
  }
}
</style>
