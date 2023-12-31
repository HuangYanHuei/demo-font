import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putUserInfo ({ formData, id }) {
    return apiHelper.put('/users', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
        'User-ID': id
      }
    })
  }
}
