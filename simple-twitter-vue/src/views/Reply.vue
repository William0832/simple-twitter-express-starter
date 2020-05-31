<template lang="pug">
  .container.py-5
      .row
        .col-md-4
          UserProfileCard(:user ='user')
        .col-md-8
          ReplyTweet(:tweet ='tweet' :user='user')
          Replies(:replies ='replies')
          ReplyNew(@after-create-reply='afterCreateReply')
</template>

<script>
import ReplyTweet from "../components/ReplyTweet";
import Replies from "../components/Replies";
import ReplyNew from "../components/ReplyNew";
import UserProfileCard from "../components/UserProfileCard";
import { Toast } from "../utils/helpers";

//api
import replyAPI from "../apis/reply";
import userAPI from "../apis/users";

export default {
  components: {
    ReplyTweet,
    Replies,
    ReplyNew,
    UserProfileCard
  },
  data() {
    return {
      tweet: {},
      replies: [],
      user: {
        id: -1,
        email: "",
        name: "",
        avatar: "",
        introduction: "",
        role: "user",
        isCurrentUser: false,
        isFollowed: false,
        tweetsCount: 0,
        followingCount: 0,
        followerCount: 0,
        likeCount: 0
      }
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
        this.user.id = this.tweet.User.id;

        this.fetchUserProfile();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async fetchReplies(tweetId) {
      try {
        const respond = await replyAPI.getReplies(tweetId);

        const { data } = respond;
        this.replies = data.tweet.Replies;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async fetchUserProfile() {
      try {
        const respond = await userAPI.getUserProfile(this.user.id);

        const { data } = respond;

        this.user = data.user;

        console.log(this.user);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterCreateReply(comment) {
      try {
        console.log(comment);
        if (!comment) {
          throw new Error("Reply can not be empty!");
        }

        const { tweet_id: tweetId } = this.$route.params;
        const respond = await replyAPI.reply.create(tweetId, comment);

        const { data } = respond;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchReplies(tweetId);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    }
  }
};
</script>