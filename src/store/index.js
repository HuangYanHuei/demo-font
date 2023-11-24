import { createStore } from 'vuex'
import restaurantsAPI from '../apis/restaurants'
import usersAPI from '../apis/user'
import orderAPI from '../apis/order'

const setLocalStorge = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalStorge = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

// shopId: {
//   shopName: '',
//   productList: {
//     productId: {
//       _id: '1',
//       name: '番茄250g/份',
//       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
//       sales: 10,
//       price: 33.6,
//       oldPrice: 39.6,
//       count: 2
//     }
//   }
// }

export default createStore({
  state: {
    cartList: getLocalStorge(),
    nearbyList: {},
    user: {},
    address: {},
    order: {}
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += payload.num
      // 這個註解掉的是不會增加物品就把check打勾的版本
      // if (product.count === 1 && payload.num > 0) {}
      if (product.count > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      if (product.count > 99) { product.count = 99 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalStorge(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorge(state)
    },
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalStorge(state)
    },
    CartItemClear (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalStorge(state)
    },
    changeAllCartItemCheck (state, payload) {
      const { shopId, isProductListCheckAll } = payload
      const productInfo = state.cartList[shopId].productList
      for (const i in productInfo) {
        productInfo[i].check = !isProductListCheckAll
      }
      state.cartList[shopId].productList = productInfo
      setLocalStorge(state)
    },
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalStorge(state)
    },
    changNearbyInfo (state, payload) {
      state.nearbyList = payload.nearbyList
    },
    setCurrentUser (state, payload) {
      const { id, name, email, image, isAdmin } = payload
      state.user.id = id
      state.user.name = name
      state.user.email = email
      state.user.image = image
      state.user.isAdmin = isAdmin
    },
    changeAddressInfo (state, payload) {
      state.address = payload
    },
    changeOrderInfo (state, payload) {
      state.order = payload
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
      } catch (error) {
        console.error(error.message)
      }
    },
    async getAddressData (context, id) {
      try {
        if (!id) return
        const response = await restaurantsAPI.getAddress({
          id
        })
        if (response?.status === 200) {
          const result = response.data.data
          context.commit('changeAddressInfo', result)
        }
      } catch (error) {
        console.error('錯誤', error)
      }
    },
    async postAddressData (context, payload) {
      try {
        const { id, city, detail, receiver, phone } = payload
        const response = await restaurantsAPI.postAddress({
          id, city, detail, receiver, phone
        })
        if (response?.status === 200) console.log('success')
      } catch (error) {
        console.error('錯誤', error)
      }
    },
    async getOrderData (context) {
      try {
        const id = context.state.user.id
        if (!id) return
        const response = await orderAPI.getOrder({
          id
        })
        if (response?.status === 200) {
          const result = response.data.data.orders
          context.commit('changeOrderInfo', result)
        }
      } catch (error) {
        console.error('錯誤', error)
      }
    },
    async putOrderData (context, payload) {
      try {
        const {
          userId,
          addressId,
          restaurantId,
          shopname,
          status,
          items,
          total
        } = payload
        const response = await orderAPI.putOrder({
          userId,
          addressId,
          restaurantId,
          shopname,
          status,
          items,
          total
        })
        if (response?.status === 200) {
          const shopId = restaurantId
          context.commit('clearCartData', shopId)
          console.log('success')
        }
      } catch (error) {
        console.error('錯誤', error)
      }
    },
    async putUserInfoData (context, payload) {
      try {
        const { formData } = payload
        const id = context.state.user.id
        if (!id) return
        const response = await usersAPI.putUserInfo({
          formData, id
        })
        if (response?.status === 200) console.log('success')
      } catch (error) {
        console.error('錯誤', error)
      }
    }
  },
  modules: {
  }
})
