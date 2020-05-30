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
  }
}