<template lang="pug">
  .container.py-5
      .row
        .col-md-4
          ReplyUserDashboard
        .col-md-8
          ReplyTweet(:tweet ='tweet')
          Replies(:replies ='replies')
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
    this.fetchTweet();
    this.fetchReplies();
  },
  methods: {
    fetchTweet() {
      this.tweet = dummyTweet;
    },
    fetchReplies() {
      this.replies = dummyReplies.Replies;
    }
  }
};
</script>