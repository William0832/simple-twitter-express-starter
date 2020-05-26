<template lang="pug">
  .container.py-5
      .row
        .col-md-8
          TweetNew
          Tweet
        .col-md-4
          UserTop
</template>

<script>
import TweetNew from "../components/TweetNew";
import Tweet from "../components/Tweet";
import UserTop from "../components/UserTop";

export default {
  components: {
    TweetNew,
    Tweet,
    UserTop
  }
};
</script>