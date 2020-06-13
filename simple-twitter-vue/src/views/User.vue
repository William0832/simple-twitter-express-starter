<template>
  <div class="container-fluid d-flex flex-column flex-grow-1 vh-100 overflow-hidden py-5">
    <div class="row px-5 mx-auto flex-grow-1 overflow-hidden" style="width: 75%;">
      <UserProfileCard
        :user="user"
        class="col-md-4 mr-auto mh-100 overflow-auto"
        @after-follow-user="afterFollowUser"
        @after-unfollow-user="afterUnfollowUser"
      />
      <UserTweets
        :tweets="tweets"
        @after-add-like="afterLike"
        @after-delete-like="afterUnlike"
        class="col-md-7 mr-auto mh-100 overflow-auto"
      />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserTweets from "../components/TweetIndex";
import UsersAPI from "../apis/users";
import tweetAPI from "../apis/tweet";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    UserProfileCard,
    UserTweets
  },
  data() {
    return {
      user: {
        id: -1,
        email: "",
        name: "",
        avatar: "",
        introduction: "",
        role: "",
        isCurrentUser: null,
        isFollowed: null,
        tweetsCount: -1,
        followingCount: -1,
        followerCount: -1,
        likeCount: -1
      },
      tweets: []
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
    this.fetchTweetsData(userId);
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    async fetchProfileData(userId) {
      try {
        const response = await UsersAPI.getUserProfile(userId);
        const { data, statusText } = response;
        if (statusText !== "OK") throw new Error();

        const {
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          isCurrentUser,
          isFollowed,
          tweetsCount,
          followingCount,
          followerCount,
          likeCount
        } = data.user;

        this.user = {
          ...this.user,
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          isCurrentUser,
          isFollowed,
          tweetsCount,
          followingCount,
          followerCount,
          likeCount
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料"
        });
      }
    },
    async fetchTweetsData(userId) {
      try {
        const response = await UsersAPI.getTweets(userId);
        const { data, statusText } = response;
        if (statusText !== "OK") throw new Error();

        this.tweets = data.tweets;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得資料"
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
    },
    async afterLike(payload) {
      const { tweetId } = payload;
      try {
        console.log("add like");
        const { data } = await tweetAPI.tweets.like(tweetId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets = this.tweets.map(tweet => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              likesCount: tweet.likesCount + 1,
              isLiked: true
            };
          }
        });

        this.$socket.emit("like", {
          userId: this.currentUser.id,
          tweetId: tweetId,
          type: "like"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法add like，請稍後再試"
        });
      }
    },
    async afterUnlike(payload) {
      const { tweetId } = payload;
      try {
        console.log("delete like");
        const { data } = await tweetAPI.tweets.unlike(tweetId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 如果在自己頁面按dislike，like頁面直接刪除
        if (this.user.isCurrentUser) {
          this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
        }

        this.tweets = this.tweets.map(tweet => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              likesCount: tweet.likesCount - 1,
              isLiked: false
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消like，請稍後再試"
        });
      }
    }
  }
};
</script>