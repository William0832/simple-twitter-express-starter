<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard
        :initial-following-list="currentUserFollowingList"
        :is-current-user="isCurrentUser"
        :initial-user="user"
        class="col-md-4 mr-auto"
      />
      <UserFollowingCard
        :initial-user="user"
        :initial-following-list="currentUserFollowingList"
        @after-follow="afterFollow"
        @after-unfollow="afterUnfollow"
        class="col-md-8"
      />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingCard from "../components/UserFollowingCard";
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserProfileCard,
    UserFollowingCard
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
        Followings: [],

        // 以下應該要分開
        Followers: [],
        Tweets: [],
        Likes: []
      },
      // currentUser: {},
      currentUserFollowingList: [],
      isCurrentUser: false
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
    this.getCurrentUserFollowingList();
  },
  methods: {
    async fetchProfileData(userId) {
      try {
        const response = await UsersAPI.getFollowings(userId);

        // if(statusText !== 'ok') throw new Error
        const {
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followings
        } = response.data.user;

        this.user = {
          ...this.user,
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followings

          // 以下應該要分開
          // Followers,
          // Tweets,
          // Likes
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料"
        });
      }
    },
    afterFollow() {
      console.log('followed')
      
      this.users = this.users.map(user => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            // followerCount: user.followerCount + 1,
            isFollowed: true
          };
        }
      });
    },
    afterUnfollow() {
      console.log('unfollowed')

      this.users = this.users.map(user => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            followerCount: user.followerCount - 1,
            isFollowed: false
          };
        }
      });
    }
  }
};
</script>>