import axios from 'axios'

const baseURL = 'https://back-demo.fly.dev/api'

export const apiHelper = axios.create({
  baseURL
})
