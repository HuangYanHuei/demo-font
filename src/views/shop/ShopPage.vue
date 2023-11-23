<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back" @click="handleBackClick">
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesomeicon" />
      </div>
      <div class="search__content">
        <span class="search__content__icon">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="awesomeicon" />
        </span>
        <input class="search__content__input" placeholder="請輸入產品名稱搜尋" />
      </div>
    </div>
    <ShopInfo :item="restaurantData" :hideBorder="true"/>
    <ContentPage :restaurantData="restaurantData" :productcategoriesData="productcategoriesData"/>
    <CartPage/>
  </div>
</template>

<script>
import { ref } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
import ContentPage from '../shop/ContentPart.vue'
import CartPage from '../shop/CartPart.vue'
import { useRouter, useRoute } from 'vue-router'
import restaurantsAPI from '../../apis/restaurants'

// 獲取商品詳情
const useShopInfoEffect = () => {
  const route = useRoute()
  const restaurantData = ref()
  const productcategoriesData = ref()
  const getItemData = async () => {
    try {
      const id = route.params.id
      const response = await restaurantsAPI.getRestaurant({
        id
      })
      if (response?.status === 200) {
        const result = response.data.data
        restaurantData.value = result.restaurant
        productcategoriesData.value = result.productcategories
      }
    } catch (error) {
      console.error('錯誤', error)
    }
  }
  return { getItemData, restaurantData, productcategoriesData }
}

// 返回上一頁
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'ShopPage',
  components: { ShopInfo, CartPage, ContentPage },
  setup () {
    const { restaurantData, getItemData, productcategoriesData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()

    getItemData()

    return { handleBackClick, restaurantData, productcategoriesData }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  padding: 0 .18rem;
}

.search {
  display: flex;
  line-height: .32rem;
  margin: .14rem 0 .04rem 0;

  &__back {
    width: .3rem;
    font-size: .21rem;
    color: #B6B6B6;
  }

  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;

    &__icon {
      box-sizing: border-box;
      width: .44rem;
      padding: 0 .12rem 0 .16rem;
      color: $search-fontColor;
      font-size: .16rem;
    }

    &__input {
      width: 100%;
      padding-right: .2rem;
      font-size: .14rem;
      border: none;
      background: none;
      outline: none;
      color: $content-fontcolor;

      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
