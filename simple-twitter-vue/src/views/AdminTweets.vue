<template lang="pug">
  .container.py-5
    AdminNavs
    AdminTweetsIndex(
      :tweets='this.tweets'
      @after-delete-tweet ='afterDeleteTweet'
      )
</template>

<script>
import AdminNavs from '../components/AdminNavs'
import AdminTweetsIndex from '../components/AdminTweetsIndex'

// api
import adminAPI from '../apis/admin'

export default {
  components: {
    AdminNavs,
    AdminTweetsIndex
  },
  data() {
    return {
      tweets: []
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const res = await adminAPI.getTweets()
        const { tweets } = res.data
        this.tweets = tweets
      } catch (err) {
        console.log(err)
      }
    },
    async afterDeleteTweet(tweetId) {
      try {
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
        await adminAPI.deleteTweets(tweetId)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
