<template lang="pug">
  .container.py-5
      .row
        .col-md-4
          ReplyUserDashboard
        .col-md-8
          ReplyTweet(:tweet ='tweet' :user='user')
          Replies(:replies ='replies')
          ReplyNew(@after-create-reply='afterCreateReply')
</template>

<script>
import ReplyUserDashboard from "../components/ReplyUserDashboard";
import ReplyTweet from "../components/ReplyTweet";
import Replies from "../components/Replies";
import ReplyNew from "../components/ReplyNew";

//api
import replyAPI from "../apis/reply";

export default {
  components: {
    ReplyUserDashboard,
    ReplyTweet,
    Replies,
    ReplyNew
  },
  data() {
    return {
      tweet: {},
      replies: [],
      user: {}
    };
  },
  created() {
    const { tweet_id: tweetId } = this.$route.params;
    this.fetchTweet(tweetId);
    this.fetchReplies(tweetId);
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const respond = await replyAPI.getTweet(tweetId);

        const { data } = respond;

        this.tweet = data.tweet;
        this.user = this.tweet.User;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReplies(tweetId) {
      try {
        const respond = await replyAPI.getReplies(tweetId);

        const { data } = respond;
        this.replies = data.tweet.Replies;
      } catch (error) {
        console.log(error);
      }
    },
    afterCreateReply(description) {
      console.log(description);
    }
  }
};
</script>