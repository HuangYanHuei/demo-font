import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  getOrder ({ id }) {
    return apiHelper.get(`/order/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putOrder
  ({
    userId,
    addressId,
    restaurantId,
    shopname,
    status,
    items,
    total
  }) {
    const searchParams = new URLSearchParams({
      userId,
      addressId,
      restaurantId,
      shopname,
      status,
      items: JSON.stringify(items),
      total
    })
    return apiHelper.put(`/order?${searchParams.toString()}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
