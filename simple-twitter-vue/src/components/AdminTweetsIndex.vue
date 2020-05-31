<template lang="pug">
  div
    h1 Tweets
    table.table
      thead.thead-dark
        tr
          th(scope='col' ) #id
          th(scope='col' style="width: 50%") Tweet
          th(scope='col') Posted
          th(scope='col') Delete


      tbody
          tr(v-for="tweet in tweets" :key='tweet.id' style="height: 50px")
            th(scope='row') {{tweet.id}}
            td.text-left {{tweet.description | peek}}
            td {{tweet.createdAt | fromNow}}
            td.align-middle.d-flex.justify-content-center 
              button.close(type='button', aria-label='Close' @click.stop.prevent='deteleTweet(tweet.id)')
                span.text-danger(aria-hidden='true') ×
</template>

<script>
import { fromNowFilter } from '../utils/mixins'

export default {
  mixins: [fromNowFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  filters: {
    peek(description) {
      if (description.length > 50) {
        return `${description.substr(0, 50)} ...`
      }
      return description ? description : '-'
    }
  },
  methods: {
    deteleTweet(tweetId) {
      this.$emit('after-delete-tweet', tweetId)
    }
  }
}
</script>
