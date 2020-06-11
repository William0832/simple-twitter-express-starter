<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1.p-2(v-for='tweet in tweets' :key='tweet.id')
      .col-3.d-flex.align-items-center.justify-content-center
        img(:src="tweet.User.avatar" v-if="tweet.User.avatar !== null")
        img(:src="nullAvatar" v-else)
      .col-8.text-left
        h3
          router-link(:to="{ name: 'user', params: { id:tweet.User.id }}")  @{{tweet.User.name}}
          | , {{tweet.createdAt | formatTime}}
        p
          | {{tweet.description}}
        a(:href='tweet.googleMapUrl' v-if='tweet.googleMapName') 
          |
          font-awesome-icon(icon="map-marker-alt")
          | {{tweet.googleMapName}}
        .row.justify-content-start
          .col.mw-50
            router-link(:to="{ name: 'replies', params: { tweet_id: tweet.id }}")
              button.btn.btn-light Reply ({{tweet.repliesCount}})
          .col.mw-50
            button.btn.btn-danger(:disabled="isProcessing" v-if ='tweet.isLiked' @click.stop.prevent="deleteLike(tweet.id)") Dislike ({{tweet.likesCount}} )
            button.btn.btn-light(:disabled="isProcessing" v-else @click.stop.prevent="addLike(tweet.id)") Like ({{tweet.likesCount}} )
</template>

<script>
import { timeFilter } from "./../utils/mixins";

export default {
  mixins: [timeFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      nullAvatar: "https://i.imgur.com/TA7O4Tm.png",
      isProcessing: false
    };
  },
  methods: {
    addLike(tweetId) {
      this.isProcessing = true;
      this.$emit("after-add-like", tweetId);
      setTimeout(() => {
        this.isProcessing = false;
      }, 500);
    },
    deleteLike(tweetId) {
      this.isProcessing = true;
      this.$emit("after-delete-like", tweetId);
      setTimeout(() => {
        this.isProcessing = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
