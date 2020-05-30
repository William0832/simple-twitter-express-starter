<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1(v-for='tweet in tweets' :key='tweet.id')
      .col-3.d-flex.align-items-center.justify-content-center
        img(:src="tweet.User.avatar")
      .col-8.text-left
        a(hred='#')
          h3 @{{tweet.User.name}} , {{tweet.createdAt | fromNow}}
        p
          | {{tweet.description}}
        .row.justify-content-start
          .col.mw-50
            a(href='#')
              button.btn.btn-light Reply ({{tweet.Replies_count}})
          .col.mw-50
            button.btn.btn-light(@click.stop.prevent="addLike") Like ({{tweet.Likes_count}} )
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
export default {
  mixins: [fromNowFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    }
  }
};
</script>