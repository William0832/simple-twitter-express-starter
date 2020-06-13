<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
      .row.flex-grow-1.overflow-hidden
        .col-md-4.mh-100.overflow-auto
          UserProfileCard(
            :user ='user'
            @after-follow-user="afterFollowUser"
            @after-unfollow-user="afterUnfollowUser")
        .col-md-8.mh-100.overflow-auto
          ReplyTweet(
            :tweet ='tweet' 
            :user='user'
            @after-add-like='afterAddLike'
            @after-delete-like='afterDeleteLike')
          Replies(:replies ='replies')
          ReplyNew(@after-create-reply='afterCreateReply')
</template>

<script>
import ReplyTweet from "../components/ReplyTweet";
import Replies from "../components/Replies";
import ReplyNew from "../components/ReplyNew";
import UserProfileCard from "../components/UserProfileCard";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

//api
import replyAPI from "../apis/reply";
import userAPI from "../apis/users";
import tweetsAPI from "../apis/tweet";

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
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
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

        console.log("reply notify");
        this.$socket.emit("reply", {
          userId: this.currentUser.id,
          tweetId: tweetId,
          type: "reply"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterAddLike(tweetId) {
      try {
        console.log(tweetId);
        const response = await tweetsAPI.tweets.like(tweetId);
        const { data } = response;

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweet(tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterDeleteLike(tweetId) {
      try {
        console.log(tweetId);
        const response = await tweetsAPI.tweets.unlike(tweetId);

        const { data } = response;

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweet(tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    afterFollowUser(userId) {
      if (userId === this.user.id) {
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount + 1,
          isFollowed: true
        };
      }
    },
    afterUnfollowUser(userId) {
      if (userId === this.user.id) {
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount - 1,
          isFollowed: false
        };
      }
    }
  }
};
</script>
