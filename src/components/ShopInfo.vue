<template>
    <div class="shop" @click="toRestuarantClick(item.id)" v-if="item">
      <img :src="item.image" alt="" class="shop__img" />
      <div class="shop__content">
        <div class="shop__content__title">
          {{ item.name }}
        </div>
        <div class="shop__content__tags">
          <span class="shop__content__tag">{{ item.Category.name }}</span>
        </div>
        <!-- <div class="shop__content__highlight">
          <p>{{ item.description }}</p>
        </div> -->

        <div class="productList" v-if="item.Products">
          <template v-for="product in item.Products" :key="product.id">
            <div class="product" v-if="product.isShowProduct && product.id">
              <img class="product__img" :src="product.image" />
              <div class="product__detail">
                <div class="product__name">{{ product.name }}</div>
                <div class="product__price">
                  <span class="product__saleprice">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'shopInfo',
  props: { item: {} },
  setup () {
    const toRestuarantClick = (id) => {
      router.push(`/shop/${id}`)
    }
    return { toRestuarantClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";

.shop {
  display: flex;
  padding-top: 0.14rem;

  &__img {
    margin-right: 0.16rem;
    min-width: 1.2rem;
    height: .8rem;
    border-radius: 10%;
  }

  // 整個標頭設置為 display:flex，兩端的寬度固定，中間設置為 flex:1，同時設置 min-width:0。
  // 要省略的地方加上@include ellipsis;
  // 即可實現flex文本超出...符號省略
  &__content {
    min-width: 0;
    padding-bottom: 0.12rem;

    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }

    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }

    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }

    &__tag {
      margin-right: 0.16rem;
    }

    &__highlight {
      margin: .08rem 0 0 0;

      p {
        line-height: 0.18rem;
        font-size: .13rem;
        color: $hightlight-fontColor;
        @include ellipsis;
      }
    }
  }
}

.productList {
  display: flex;
  overflow-x: auto;
}

.product {
  &__img {
    margin-top: .08rem;
    width: 0.54rem;
    height: 0.54rem;
    border-radius: 5%;
  }

  &__name {
    margin-top: 0.04rem;
    width: .74rem;
    font-size: 0.12rem;
    line-height: 0.17rem;
    color: $content-fontcolor;
    @include ellipsis;
  }

  &__price {
    margin-top: 0.02rem;
    width: .76rem;
    @include ellipsis;
  }

  &__oldprice {
    font-size: 0.1rem;
    line-height: 0.14rem;
    color: $light-fontColor;
    text-decoration: line-through;
  }

  &__saleprice {
    margin-right: .04rem;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: $hightlight-fontColor;
  }
}
</style>
