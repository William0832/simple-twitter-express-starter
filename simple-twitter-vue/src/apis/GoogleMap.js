import { apiHelper } from '../utils/helpers'
// const getToken = () => localStorage.getItem('token')

export default {
  getMapSearch(url) {
    return apiHelper.get(url)
  }
}