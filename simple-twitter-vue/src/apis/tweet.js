import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets(offset) {
    const searchParams = new URLSearchParams({ offset })
    return apiHelper.get(`/tweets?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopUsers() {
    return apiHelper.get('/tweets/top_users', {
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
    },
    like(tweetId) {
      return apiHelper.post(`/tweets/${tweetId}/like`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    },
    unlike(tweetId) {
      return apiHelper.post(`/tweets/${tweetId}/unlike`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    }
  }

}