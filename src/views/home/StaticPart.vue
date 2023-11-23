<template>
  <div class="position">
    <font-awesome-icon class="position__icon" icon="fa-solid fa-location-dot" />
    269 宜蘭縣冬山鄉鹿梅路2號
    <font-awesome-icon class="position__notice" icon="fa-regular fa-bell" />
  </div>
  <router-link to="/search">
    <div class="search">
      <font-awesome-icon class="search__icon" icon="fa-solid fa-magnifying-glass" />搜尋餐廳
    </div>
  </router-link>
  <div class="banner">
    <img class="banner__img"
      src="https://png.pngtree.com/png-clipart/20210704/original/pngtree-high-end-creative-restaurant-gourmet-coupon-banner-png-image_6480006.jpg"
      alt="">
  </div>
  <div class="icons">
      <router-link :to="{ name: 'Restaurants', query: { categoryId: '' } }">
        <button class="icons__button">全部</button>
      </router-link>
    <div v-for="category in getDataFromStore" :key="category.id">
      <router-link :to="{ name: 'Restaurants', query: { categoryId: category.id } }">
        <button class="icons__button">{{ category.name }}</button>
      </router-link>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'StaticPart',
  setup () {
    const store = useStore()
    const getDataFromStore = computed(() => {
      return store.state.nearbyList.categories
    })
    return { getDataFromStore }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  height: .22rem;
  font-size: .16rem;
  @include ellipsis;

  &__icon {
    margin-right: .085rem;
    font-size: .2rem;
  }

  &__notice {
    //鈴鐺脫離頁面，在上層.position設定position:relative;
    //然後在&__notice設定position: absolute;再利用right top定位
    position: absolute;
    right: .1rem;
    top: .16rem;
    font-size: .2rem;
  }

  color:$content-fontcolor;
}

a {
  text-decoration: none;
}

.search {
  margin-bottom: .12rem;
  font-size: .16rem;
  line-height: .32rem;
  border-radius: .14rem;
  color: $search-fontColor;
  background: $search-bgColor;
  @include ellipsis;

  &__icon {
    font-size: .16rem;
    padding: 0 .12rem 0 .16rem;
  }
}

.banner {
  &__img {
    width: 100%;
    height: 1rem;
  }
}

.icons {
  display: flex;
  margin-top: .16rem;
  overflow-x: auto;
  white-space: nowrap;

  &__button {
    margin: 0 .08rem .08rem 0;
    padding: .1rem .1rem;
    font-size: .12rem;
    border-radius: 10%;
    border: none;
    transition: transform 0.2s ease-in-out;
    &:active {
    transform: scale(0.95);
    background-color:black;
    color:white;
  }
  }

  &__img {
    //img為行內元素不可設定長寬，元素的寬高由它的內容撐開，因此要改為block
    //常見區塊元素標籤：div、ul li、p、h1
    //常見行內元素標籤：span、a、input、img
    display: block;
    width: .4rem;
    height: .4rem;
    //水平居中
    margin: 0 auto;
  }

  &__desc {
    padding: .06rem 0 .16rem 0;
    text-align: center;
    color: $content-fontcolor;
  }
}

.gap {
  //因為gap寫在wrapper裡wrapper有左右留白18px;
  //因此向外撐開必須寫 margin: 0 -.18rem;
  //內層的div設定了水平的負邊距而因此變大
  //效果能實現的前提是元素的寬度不能設定為auto以外的值
  //margin負值使用方法參考以下網站
  //  https://tw511.com/a/01/22940.html
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}</style>
