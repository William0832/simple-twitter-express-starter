import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  tweets: {
    create(description) {
      return apiHelper.post('/tweets', { description }, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    }
  }
}