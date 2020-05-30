<template lang="pug">
  .container.py-5
      .row
        .col-md-4
          ReplyUserDashboard
        .col-md-8
          ReplyTweet(:tweet ='tweet')
          Replies
</template>

<script>
import ReplyUserDashboard from "../components/ReplyUserDashboard";
import ReplyTweet from "../components/ReplyTweet";
import Replies from "../components/Replies";

const dummyTweet = {
  id: 52,
  description: "ggsfgs",
  UserId: 1,
  createdAt: "2020-05-29T14:57:21.000Z",
  updatedAt: "2020-05-29T14:57:21.000Z",
  Replies_count: 0,
  Likes_count: 0,
  User: {
    id: 1,
    name: "root",
    avatar:
      "https://loremflickr.com/240/240/man,women/?random=52.91279172455272"
  },
  Likes: {
    UserId: null
  },
  isLiked: false
};

export default {
  components: {
    ReplyUserDashboard,
    ReplyTweet,
    Replies
  },
  data() {
    return {
      tweet: {},
      replies: [],
      user: {}
    };
  },
  created() {
    this.fetchTweet;
  },
  methods: {
    fetchTweet() {
      this.tweet = dummyTweet;
    }
  }
};
</script>