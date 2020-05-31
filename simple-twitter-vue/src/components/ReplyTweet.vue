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
          button.btn.btn-light(@click.stop.prevent="addLike") Like 
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
  methods: {
    addLike() {}
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>