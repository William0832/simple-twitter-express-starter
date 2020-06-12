import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUsers() {
    return apiHelper.get(`/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweets() {
    return apiHelper.get(`/admin/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteTweets(id) {
    return apiHelper.delete(`/admin/tweets/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      validateStatus: function (status) {
        return status < 500 // Resolve only if the status code is less than 500
      }
    })
  }
}
