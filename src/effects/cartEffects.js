// 購物車相關邏輯
import { useStore } from 'vuex'
import { computed } from 'vue'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    // 過濾數量是0的產品
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  const calculate = computed(() => {
    const productList = cartList[shopId]?.productList || []
    const result = { total: 0, price: 0, totalcheck: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check === true) {
          result.price += (product.count * product.price)
        }
        if (productList[i].count > 0 && productList[i].check === false) {
          result.totalcheck = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, productList, changeCartItemInfo, shopName, calculate }
}
