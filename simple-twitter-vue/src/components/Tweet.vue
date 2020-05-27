<template lang="pug">
  .row.border.border-secondary.rounded.my-1
    .col-3.d-flex.align-items-center.justify-content-center
      img(:src="tweet.User.avatar")
    .col-8.text-left
      a(hred='#')
        h3 @{{tweet.User.name}} , {{tweet.createdAt | fromNow}}
      p
        | {{tweet.description}}
      .row.justify-content-start
        .col-3
          h6 Reply ({{tweet.Replies_count}})
        .col-3
          h6 Like ({{tweet.Likes_count}})
</template>

<script>
import { fromNowFilter } from "../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    initTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: this.initTweet
    };
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>