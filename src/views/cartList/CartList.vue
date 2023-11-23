<template>
  <div class="cartlist">
    <header class="cartlist__header">我的全部購物車</header>
    <div class="product" v-for="(item, index) in cartList" :key="item.shopName" @click="handleShopClick(index)"
      v-show="getProductCount(index) > 0">
      <div class="product__shopname">
        <h4>{{ item.shopName }}</h4>
      </div>
      <template v-for="product in item.productList" :key="product._id">
        <div class="product__item" v-if="product.check === true && product.count > 0">
          <img :src="product.image" class="product__item__img" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ product.name }}</h4>
            <div class="product__item__price">
              <span class="product__item__twd">${{ product.price }}</span>
              <p class="product__item__count">
                &nbsp;x&nbsp;{{ product.count }}
              </p>
              <p class="product__item__total">
                ${{ getProductTotalPrice(product) }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <div class="product__item__totalmount">
        共計 {{ getProductCount(index) }} 件
      </div>
    </div>
  </div>
  <DockerPart />
</template>

<script>
import DockerPart from '../home/DockerPart'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const router = useRouter()

  const getProductCount = (shopId) => {
    let total = 0
    const productList = cartList[shopId].productList
    for (const i in productList) {
      total += productList[i].count
    }
    return total
  }

  const getProductTotalPrice = (product) => {
    const total = product.count * product.price
    return total.toFixed(1)
  }

  const handleShopClick = (id) => {
    router.push(`/orderConfirmation/${id}`)
  }

  return { cartList, getProductCount, getProductTotalPrice, handleShopClick }
}
export default {
  name: 'CartList',
  components: { DockerPart },
  setup () {
    const { cartList, getProductTotalPrice, getProductCount, handleShopClick } =
      useCartEffect()
    return { cartList, getProductTotalPrice, getProductCount, handleShopClick }
  }
}
</script>

<style lang="scss" scoped>
.cartlist {
  //overflow-y:auto;捲軸
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  //.1rem為了讓捲軸捲到最下面項目不要太貼docker
  padding: 0 0.18rem 0.1rem 0.18rem;
  background: #f5f5f5;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 -0.18rem;
    font-size: 0.16rem;
    line-height: 0.44rem;
    color: #333333;
    background: #ffffff;
  }

  .product {
    margin-top: 0.16rem;
    padding: 0 0.16rem 0.16rem 0.16rem;
    background: #ffffff;

    &__shopname {
      font-size: 0.16rem;
      color: #333333;
      line-height: 0.54rem;
    }

    &__item {
      display: flex;
      padding-bottom: 0.16rem;
      background: #ffffff;
      border-radius: 0.04rem;

      &__detail {
        width: 100%;
      }

      &__img {
        margin-right: 0.16rem;
        font-size: 0.46rem;
        height: 0.46rem;
        width: 0.46rem;
      }

      &__title {
        font-size: 0.14rem;
        color: #333333;
        line-height: 0.2rem;
      }

      &__price {
        display: flex;
        margin-top: 0.06rem;
        font-size: 0.14rem;
        color: #e93b3b;
        line-height: 0.2rem;
      }

      &__total {
        margin-left: auto;
        color: #000000;
      }

      &__totalmount {
        text-align: center;
        line-height: 0.28rem;
        font-size: 0.14rem;
        color: #999999;
        background: #f5f5f5;
      }
    }
  }
}
</style>
