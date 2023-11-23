<template>
  <div class="cartlist">
    <header class="cartlist__header">
      我的訂單
    </header>
    <div class="cartlist__item" v-for="(item, index) in list" :key="index">
      <div class="cartlist__item__top">
        <div class="cartlist__item__top__title">
          {{ item.shopname }}
        </div>
        <div class="cartlist__item__top__state">
          {{ item.status ? '已下單' : '已取消' }}
        </div>
      </div>
      <div class="cartlist__item__bottom">
        <div class="cartlist__item__bottom__imgs" v-for="(innerItem, innerIndex) in item.Orderitems" :key="innerIndex">
          <img :src="innerItem.Product.image" alt="" class="cartlist__item__bottom__img">
        </div>
        <div class="detail">
          <div class="cartlist__item__bottom__price">$ {{ item.total }}</div>
          <div class="cartlist__item__bottom__count">共 {{ item.totalNumber }} 件</div>
        </div>
      </div>
    </div>
  </div>
  <DockerPart />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import DockerPart from '../home/DockerPart'

// 處理訂單邏輯
const useOrderListEffect = () => {
  const data = reactive({ list: [] })

  const getOrder = async () => {
    const store = useStore()
    await store.dispatch('getOrderData')
    const orderList = store.state.order
    for (const item of orderList) {
      let totalNumber = 0
      for (const num in item.Orderitems) {
        totalNumber += (item.Orderitems[num]?.quantity || 0)
        item.totalNumber = totalNumber
      }
    }
    data.list = orderList
  }
  getOrder()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { DockerPart },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.cartlist {
  //overflow-y:auto;捲軸
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  //.1rem為了讓捲軸捲到最下面項目不要太貼docker
  padding: 0 .18rem .1rem .18rem;
  background: $search-bgColor;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 -.18rem;
    font-size: .16rem;
    line-height: .44rem;
    color: $content-fontcolor;
    background: $bgColor;
  }

  &__item {
    margin-top: .16rem;
    background: $bgColor;
    border-radius: .04rem;

    &__top {
      display: flex;
      margin: 0 .16rem;

      &__title {
        font-size: .16rem;
        color: $content-fontcolor;
        line-height: .55rem;
      }

      &__state {
        margin-left: auto;
        font-size: .14rem;
        color: $light-fontColor;
        line-height: .55rem;
      }
    }

    &__bottom {
      display: flex;
      padding: 0 .16rem;

      &__img {
        font-size: .4rem;
        height: .4rem;
        width: .4rem;
        margin: 0 .12rem .16rem 0;
      }

      .detail {
        margin-left: auto;
      }

      &__price {
        font-size: .14rem;
        color: $hightlight-fontColor;
        margin-bottom: .04rem;
      }

      &__count {
        font-size: .12rem;
        color: $content-fontcolor;
      }
    }
  }
}
</style>
