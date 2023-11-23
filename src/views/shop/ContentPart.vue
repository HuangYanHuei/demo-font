<template>
  <div class="content">
    <ul class="category">
      <li :class="{ 'category__item': true, 'category__item--active': currentTab === item.id }"
        v-for="item in categories" :key="item.name" @click="() => handleTabClick(item.id)">{{ item.name }}
      </li>
    </ul>
    <div class="product" v-if="restaurantData">
      <div class="product__item" v-for="item in filteredProducts" :key="item.id">
        <img class="product__item__img" :src="item.image" alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__desc">{{ item.description }}</p>
          <div class="product__item__price">
            <span class="product__item__twd">${{ item.price }}</span>
          </div>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => { changeCartItem(restaurantData.id, item.id, item, -1, restaurantData.name) }">-</span>
          {{ cartList?.[restaurantData.id]?.productList?.[item.id]?.count || 0 }}
          <span class="product__number__plus" @click="() => { changeCartItem(restaurantData.id, item.id, item, 1, restaurantData.name) }">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 列表內容相關的邏輯
const useCartEffect = () => {
  const store = useStore()
  const { changeCartItemInfo, cartList } = useCommonCartEffect()

  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }

  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }

  return { cartList, changeCartItem }
}

export default {
  name: 'ContentPart',
  props: ['shopName', 'restaurantData', 'productcategoriesData'],
  setup (props) {
    const route = useRoute()
    const shopId = route.params.id
    const categories = ref([])
    const currentTab = ref(0)
    const { restaurantData } = toRefs(props)

    const handleTabClick = (id) => {
      currentTab.value = id
    }

    const filteredProducts = computed(() => {
      if (!restaurantData.value || !restaurantData.value.Products) {
        return []
      }

      if (currentTab.value === 0) {
        return restaurantData.value.Products
      }

      return restaurantData.value.Products.filter(
        (product) => product.productcategoryId === currentTab.value)
    })

    const { cartList, changeCartItem } = useCartEffect()

    // 使用 watch 監聽 productcategoriesData
    watch(
      () => props.productcategoriesData,
      (newValue) => {
        if (newValue) {
          // 執行獲取分類資料的邏輯
          const newCategories = Object.values(newValue).map(category => ({
            id: category.id,
            name: category.name
          }))
          newCategories.unshift({ id: 0, name: '全部' })

          // 更新 categories 和 currentTab
          categories.value = newCategories
          currentTab.value = newCategories[0]?.id
        }
      }
    )

    return { categories, shopId, cartList, changeCartItem, currentTab, handleTabClick, filteredProducts }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}

.category {
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: $search-bgColor;
  border-radius: .02px;

  &__item {
    line-height: .4rem;
    font-size: .14rem;
    list-style-type: none;
    text-align: center;
    color: $content-fontcolor;

    &--active {
      background: $bgColor;
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  min-width: 0;

  &__item {
    //position：relative設定父元素只對底下的子元素生效，在編寫html時要特別注意
    display: flex;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;

    &__detail {
      //避免超過寬度內容出現
      @include ellipsis;
    }

    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
      border-radius: 10%;
    }

    &__title {
      height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__desc {
      font-size: .12rem;
      color: $content-fontcolor;
      line-height: .16rem;
      margin: .06rem 0;
      @include ellipsis;
    }

    &__price {
      width: 100%;
      line-height: .2rem;
    }

    &__twd {
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

    &__origin {
      position: relative;
      top: .025rem;
      right: .03rem;
      display: inline-block;
      font-size: .2rem;
      color: $light-fontColor;
      text-decoration: line-through;
      transform: scale(0.5);
    }
  }

  &__number {
    position: absolute;
    right: .02rem;
    bottom: .12rem;
    font-size: .1rem;

    &__minus,
    &__plus {
      display: inline-block;
      width: .2rem;
      height: .2rem;
      line-height: .17rem;
      border-radius: 50%;
      font-size: .12rem;
      text-align: center;
    }

    &__minus {
      border: .01rem solid $medium-fontColor;
      color: $medium-fontColor;
      margin: 0 .05rem 0 0;
    }

    &__plus {
      background: $btn-bgColor;
      color: $bgColor;
      margin: 0 0 0 .05rem;
    }
  }
}
</style>
