<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 75%;">
      <UserProfileCard
        :user="user"
        class="col-md-4 mr-auto"
        @after-follow-user="afterFollowUser"
        @after-unfollow-user="afterUnfollowUser"
      />
      <UserTweets :tweets="tweets" class="col-md-7" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserTweets from "../components/UserTweets";

// 拿user profile資料的 API
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

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
    this.fetchTweetsData(userId)
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

        this.tweets = data.tweets

      } catch (error) {
        console.log(error)
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
    }
  }
};
</script>