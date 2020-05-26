<template lang="pug">
  .container.py-5
      .row
        .col-md-4
          ReplyUserDashboard
        .col-md-8
          ReplyTweet
          Replies
</template>

<script>
import ReplyUserDashboard from "../components/ReplyUserDashboard";
import ReplyTweet from "../components/ReplyTweet";
import Replies from "../components/Replies";

export default {
  components: {
    ReplyUserDashboard,
    ReplyTweet,
    Replies
  }
};
</script>