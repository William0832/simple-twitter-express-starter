import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  followship: {
    create(userId) {
      return apiHelper.post('/followships', { id: userId }, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    },
    delete(userId) {
      return apiHelper.delete(`/followships/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    }
  }
}