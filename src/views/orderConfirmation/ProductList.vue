<template>
    <div class="product">
      <div class="product__shopname">
        <h4>{{ shopName }}</h4>
      </div>
      <template v-for="product in productList" :key="product._id">
        <div class="product__item" v-if="product.check">
          <img :src="product.image" class="product__item__img">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ product.name }}</h4>
            <div class="product__item__price">
              <span class="product__item__twd">${{ product.price }}</span>
              <p class="product__item__count">&nbsp;x&nbsp;{{ product.count }}</p>
              <p class="product__item__total">${{ getProductTotalPrice(product).total }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

const useCartEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const { shopName, productList } = useCommonCartEffect(shopId)

  const getProductTotalPrice = (product) => {
    const total = (product.count * product.price).toFixed(1)
    return { total }
  }

  return { shopName, productList, getProductTotalPrice }
}
export default {
  name: 'ProductList',
  setup () {
    const { shopName, productList, getProductTotalPrice } = useCartEffect()
    return { shopName, productList, getProductTotalPrice }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.product {
  margin: 0 .18rem .65rem .18rem;
  padding: 0 .16rem;
  background: $bgColor;
  overflow-y: auto;

  &__shopname {
    font-size: .16rem;
    color: $content-fontcolor;
    line-height: .54rem;
  }

  &__item {
    display: flex;
    padding-bottom: .16rem;
    background: $bgColor;
    border-radius: .04rem;

    &__detail {
      width: 100%;
    }

    &__img {
      margin-right: .16rem;
      font-size: .46rem;
      height: .46rem;
      width: .46rem;
    }

    &__title {
      font-size: .14rem;
      color: $content-fontcolor;
      line-height: .2rem;
    }

    &__price {
      display: flex;
      margin-top: .06rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      line-height: .2rem;
    }

    &__total {
      margin-left: auto;
      color: $dark-fontColor;
    }
  }
}
</style>
