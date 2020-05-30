<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard
        :is-current-user="isCurrentUser"
        :initial-user="user"
        :initial-following-list="currentUserFollowingList"
        class="col-md-4 mr-auto"
      />
      <UserFollowerCard
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
import UserFollowerCard from "../components/UserFollowerCard";
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserProfileCard,
    UserFollowerCard
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
      currentUser: {},
      currentUserFollowingList: [],
      isCurrentUser: null
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserData(userId);
    this.getCurrentUserFollowingList();
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const response = await UsersAPI.getFollowers(userId);
        const { data } = response;
        console.log("response", data);

        // Followings,
        // Tweets,
        // Likes,

        const {
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followers
        } = data.user;

        this.user = {
          ...this.user,
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followers

          // Tweets,
          // Likes
        };

        this.isCurrentUser = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料"
        });
      }
    },
    getCurrentUserFollowingList() {
      // // 把currentUser follow 的 id們 做成array
      // let currentUserFollowingList = this.currentUser.Followings.map(
      //   user => user.id
      // );
      // console.log(currentUserFollowingList)
      this.currentUserFollowingList = [2, 3];
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