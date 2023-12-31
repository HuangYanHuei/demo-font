import { apiHelper } from '../utils/helper'

export default {
  // 帶入需要的參數
  signIn ({ email, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  signUp ({ name, email, password, passwordCheck }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/signup', {
      name,
      email,
      password,
      passwordCheck
    })
  }
}
