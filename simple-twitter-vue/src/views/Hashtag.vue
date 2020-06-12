<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
    .row.flex-grow-1.overflow-hidden
      .col-md-2.mh-100  
        h4 # tag
      .col-md-10.mh-100.overflow-auto
        TweetNew(
          :user-id='currentUser.id' 
          @after-create-tweet='afterCreateTweet')
        TweetIndex( :tweets='tweets'
          @after-add-like='afterAddLike'
          @after-delete-like='afterDeleteLike')
</template>

<script>
import TweetNew from '../components/TweetNew'
import TweetIndex from '../components/TweetIndex'

import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

//api
import tweetsAPI from '../apis/tweet'
import followshipAPI from '../apis/followship'

export default {
  components: {
    TweetNew,
    TweetIndex,
  },
  data() {
    return {
      tweets: [],
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  async created() {
    await this.socketLogin()
    await this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets()

        const { data } = response

        this.tweets = data.tweets
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推特資料，請稍後再試'
        })
      }
    },
    async afterCreateTweet(tweet) {
      try {
        if (!tweet.description) {
          throw new Error('Tweet can not be empty!')
        }

        if (tweet.description.length > 140) {
          throw new Error('Tweet should be shorter than 140 characters!')
        }

        const response = await tweetsAPI.tweets.create(tweet)

        const { data } = response

        //add statusText
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.fetchTweets()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error
        })
      }
    },
    async afterAddFollow(userId) {
      try {
        const response = await followshipAPI.followship.create(userId)
        const { data } = response
        //add statusText
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchTopUsers()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error
        })
      }
    },
    async afterDeleteFollow(userId) {
      try {
        const response = await followshipAPI.followship.delete(userId)
        const { data } = response

        //add statusText
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error
        })
      }
    },
    async afterAddLike(tweetId) {
      try {
        const response = await tweetsAPI.tweets.like(tweetId)
        const { data } = response

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.fetchTweets()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error
        })
      }
    },
    async afterDeleteLike(tweetId) {
      try {
        const response = await tweetsAPI.tweets.unlike(tweetId)
        const { data } = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchTweets()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error
        })
      }
    },
    socketLogin() {
      this.$socket.emit('login', this.currentUser.id)
    }
  }
}
</script>
