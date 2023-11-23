<template>
  <div class="docker">
    <!-- https://stackoverflow.com/questions/66282739/font-awesome-icons-not-displaying-in-v-for-loop-in-vue-but-rendering-as-html-te

        不使用v-html -->
    <div
      v-for="item in dockerList"
      :key="item.icon"
      :class="{'docker__item--active': $route.name === item.to.name }"
      class="docker__item"
      >
  <!-- 對於 :to 屬性，需要傳遞一個包含路由名稱的物件，而不是直接傳遞一個字串。因此，應該使用 :to="item.to" 而不是 :to="item.to.name"。

  item.to 是一個物件，其中包含了一個名為 name 的屬性，該屬性對應到路由的名稱，因此將整個物件傳遞給 :to 屬性時，Vue Router 會自動解析為正確的路由連結。不需要在 :to 中使用 .name。 -->

      <router-link :to="item.to">
        <div class="awesomeicon">
          <font-awesome-icon :icon="['fas', item.icon]" />
        </div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerPart',
  setup () {
    const dockerList = [
      { icon: 'fa-house', text: '首頁', to: { name: 'Home' } },
      { icon: 'fa-cart-shopping', text: '購物車', to: { name: 'Cart' } },
      { icon: 'fa-receipt', text: '訂單', to: { name: 'OrderList' } },
      { icon: 'fa-user', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';

.docker {
  display: flex;
  box-sizing: border-box;
  position: fixed;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;

  &__item {
    flex: 1;
    padding-top:.04rem;
    text-align: center;
    align-items: center;
    a{
      color: $content-fontcolor;
      text-decoration: none;
    }

    .awesomeicon {
      margin-bottom: .02rem;
      font-size: .18rem;
    }

    &--active {
      a{
        color: #1FA4Fc;
      }
    }
  }

  &__title {
    //字體要10px，但瀏覽器不能顯示12px以下的文字，因此要用縮放
    font-size: .2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
