import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants ({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getRestaurant ({ id }) {
    return apiHelper.get(`/restaurants/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getSearch ({ keyword }) {
    const searchParams = new URLSearchParams({ keyword })
    return apiHelper.get(`/searchList?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getAddress ({ id }) {
    return apiHelper.get(`/address/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postAddress ({ id, city, detail, receiver, phone }) {
    const searchParams = new URLSearchParams({ id, city, detail, receiver, phone })
    return apiHelper.post(`/address?${searchParams.toString()}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
