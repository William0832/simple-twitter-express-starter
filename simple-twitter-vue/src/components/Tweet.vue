<template lang="pug">
  .row.border.border-secondary.rounded.my-1
    .col-3.d-flex.align-items-center.justify-content-center
      img(:src="tweet.User.avatar")
    .col-8.text-left
      a(hred='#')
        h1 @{{tweet.User.name}} ,2018-11-04
      p
        | {{tweet.description}}
      .row.justify-content-start
        .col-3
          h6 Reply ({{tweet.Replies_count}})
        .col-3
          h6 Like ({{tweet.Likes_count}})
</template>

<script>
const imageUrl =
  "https://loremflickr.com/240/240/man,women/?random=90.59691100585958";

export default {
  props: {
    initTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: this.initTweet,
      image: imageUrl
    };
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>