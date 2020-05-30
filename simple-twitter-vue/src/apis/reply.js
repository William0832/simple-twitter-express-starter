import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweet(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getReplies(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}/replies	`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  reply: {
    create(tweetId, comment) {
      return apiHelper.post(`/tweets/${tweetId}/replies	`, { comment }, {
        headers: { Authorization: `Bearer ${getToken()}` },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      }
      )
    }
  }
}