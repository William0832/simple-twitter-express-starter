<template lang="pug">
  .container
    .row
      h3 Tweet
    .row.border.border-secondary.rounded.my-1
      .col-3.d-flex.align-items-center.justify-content-center
        img(:src="user.avatar")
      .col-8.text-left
        h3 @{{user.name}} , {{tweet.createdAt | fromNow}}
        p
          | {{tweet.description}}
        .row.justify-content-start
          button.btn.btn-danger(:disabled="isProcessing" v-if ='tweet.isLiked' @click.stop.prevent="deleteLike(tweet.id)") Dislike 
          button.btn.btn-light(:disabled="isProcessing" v-else @click.stop.prevent="addLike(tweet.id)") Like 
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
export default {
  mixins: [fromNowFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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