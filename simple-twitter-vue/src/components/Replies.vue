<template lang="pug">
  .container
    .row
      h3 Replies
    .row.border.border-secondary.rounded.my-1(v-for='reply in replies' :key='reply.id')
      .col-3.d-flex.align-items-center.justify-content-center
        img(:src="reply.User.avatar")
      .col-8.text-left
        h3
          | 
          router-link(:to="{ name: 'user', params: { id:reply.User.id }}") @{{reply.User.name}}
          |  , {{reply.createdAt | fromNow}}
        p
          | {{reply.comment}}
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
export default {
  mixins: [fromNowFilter],
  props: {
    replies: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>