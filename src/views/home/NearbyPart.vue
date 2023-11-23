<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店家</h3>
    <div class="nearby__list">
      <template v-for="restaurant in nearbyList.restaurants" :key="restaurant.id">
        <ShopInfo :item="restaurant" />
      </template>
    </div>
    <div ref="loadMoreTrigger"></div>
    <div class="state" v-if="isMaxPage">到底了</div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import restaurantsAPI from '../../apis/restaurants'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'NearbyPart',
  components: { ShopInfo },
  setup () {
    const route = useRoute()
    const store = useStore()

    // 創建一個名為 nearbyList 的響應式變數
    const nearbyList = ref({
      restaurants: [], // 存儲餐廳數據的數組
      categories: [], // 存儲分類數據的數組
      currentPage: 1, // 當前頁碼，默认為 1
      totalPage: 0, // 總頁數
      isLoading: true // 是否正在加載數據，默认為 true
    })

    // 非同步函數，用於獲取附近店鋪列表
    const getNearbyList = async (page) => {
      console.log('請求頁面:', page)
      try {
        const categoryId = route.query.categoryId
        // 發送請求獲取店鋪數據
        const response = await restaurantsAPI.getRestaurants({
          page,
          categoryId
        })
        if (response?.status === 200) {
          const result = response.data.data
          if (page === 1) {
            // 如果是第一頁，直接覆蓋 restaurants 數據
            nearbyList.value.restaurants = result.restaurants
            nearbyList.value.categories = result.categories
            nearbyList.value.totalPage = result.pagination.totalPage
          } else {
            // 如果不是第一頁，將新的店鋪數據追加到 restaurants 數組中
            nearbyList.value.restaurants = [...nearbyList.value.restaurants, ...result.restaurants]
          }
          nearbyList.value.currentPage = page
          // 提交數據到 Vuex
          store.commit('changNearbyInfo', { nearbyList: nearbyList.value })
          nearbyList.value.isLoading = false
          console.log('當前頁碼:', nearbyList.value.currentPage)
        }
      } catch (error) {
        nearbyList.value.isLoading = false
        console.error('錯誤', error)
      }
    }

    const loadMoreTrigger = ref(null)
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !nearbyList.value.isLoading) {
        nearbyList.value.isLoading = true
        // 觸發加載更多時，請求下一頁數據
        getNearbyList(nearbyList.value.currentPage + 1)
      }
    })

    const isMaxPage = computed(() => {
      const { currentPage, totalPage } = nearbyList.value
      return currentPage > totalPage
    })

    // 在組件掛載後開始觀察加載更多的觸發元素
    onMounted(() => {
      observer.observe(loadMoreTrigger.value)
    })

    // 監聽路由中的 categoryId 變化，如果變化則重新加載第一頁數據
    watch(() => route.query.categoryId, (newCategoryId, oldCategoryId) => {
      if (newCategoryId !== oldCategoryId) {
        nearbyList.value.isLoading = true
        nearbyList.value.currentPage = 1
        nearbyList.value.restaurants = []
        // 切換分類時，重新請求第一頁數據
        getNearbyList(1)
      }
    })

    // 初始化時獲取第一頁數據
    getNearbyList(nearbyList.value.currentPage)

    return { nearbyList, loadMoreTrigger, isMaxPage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }

  &__list {
    display: grid; /* 使用 Grid 布局 */
    grid-template-columns: repeat(2, 1fr); /* 两列 */
    @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 当屏幕宽度小于768px时，一列显示 */
  }
  }

  a {
    text-decoration: none;
  }

  .state {
    margin-top: .12rem;
    text-align: center;
    font-size: .14rem;
    color: $bgColor;
    background: $search-fontColor;
  }
}
</style>
