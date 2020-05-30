<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1.p-2(v-for='tweet in tweets' :key='tweet.id')
      .col-3.d-flex.align-items-center.justify-content-center
        img(:src="tweet.User.avatar")
      .col-8.text-left
        h3
          router-link(:to="{ name: 'user', params: { id:tweet.User.id }}")  @{{tweet.User.name}}
          | , {{tweet.createdAt | fromNow}}
        p
          | {{tweet.description}}
        .row.justify-content-start
          .col.mw-50
            router-link(:to="{ name: 'replies', params: { tweet_id: tweet.id }}")
              button.btn.btn-light Reply ({{tweet.Replies_count}})
          .col.mw-50
            button.btn.btn-danger(v-if ='tweet.isLiked' @click.stop.prevent="deleteLike(tweet.id)") Dislike ({{tweet.Likes_count}} )
            button.btn.btn-light(v-else @click.stop.prevent="addLike(tweet.id)") Like ({{tweet.Likes_count}} )
</template>

<script>
import { fromNowFilter } from "../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  methods: {
    addLike(tweetId) {
      console.log("addLike");
      this.$emit("after-add-like", tweetId);
    },
    deleteLike(tweetId) {
      this.$emit("after-delete-like", tweetId);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>