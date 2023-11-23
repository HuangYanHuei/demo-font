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
        <input class="search__content__input" v-model="keyword" @change="handleSearchInputChange" />
      </div>
    </div>
    <router-link :to="`/shop/${item.id}`" v-for="item in searchList.restaurants" :key="item.id">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import restaurantsAPI from '../../apis/restaurants'
import ShopInfo from '../../components/ShopInfo'

// 返回上一頁
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
// 取得搜索內容
const useSearchListEffext = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    try {
      const response = await restaurantsAPI.getSearch({ keyword })
      if (response?.status === 200) {
        searchList.value = response.data.data
      }
    } catch (error) {
      console.error('錯誤', error)
    }
  }
  return { searchList, getSearchList }
}

export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup () {
    const route = useRoute()
    // 搜索關鍵詞邏輯
    const keyword = ref(route.query.keyword || '')
    const handleSearchInputChange = () => {
      getSearchList(keyword.value)
    }
    const { handleBackClick } = useBackRouterEffect()
    const { searchList, getSearchList } = useSearchListEffext()
    getSearchList(keyword.value)
    return { handleBackClick, keyword, handleSearchInputChange, searchList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 .18rem;

  a {
    text-decoration: none;
  }
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
    }
  }
}
</style>
