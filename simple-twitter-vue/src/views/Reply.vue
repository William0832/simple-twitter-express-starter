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

const dummyReplies = {
  Replies: [
    {
      id: 10,
      comment: "Voluptatibus accusantium expedita vel aspernatur dolor ea.",
      createdAt: "2020-05-29T09:22:46.000Z",
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439"
      }
    },
    {
      id: 17,
      comment:
        "Molestiae incidunt totam esse velit alias a at. Omnis impedit ad vel reiciendis aliquam. Debitis repellat nostrum explicabo amet alias. Laud",
      createdAt: "2020-05-29T09:22:46.000Z",
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434"
      }
    }
  ]
};

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
    this.fetchReplies();
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
    fetchReplies() {
      this.replies = dummyReplies.Replies;
    },
    afterCreateReply(description) {
      console.log(description);
    }
  }
};
</script>