<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard
        :user="user"
        class="col-md-4 mr-auto"
        @after-follow-user="afterFollowUser"
        @after-unfollow-user="afterUnfollowUser"
      />
      <UserFollowingCard
        :following-list="followingList"
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
        isCurrentUser: null,
        isFollowed: null,
        tweetsCount: -1,
        followingCount: -1,
        followerCount: -1,
        likeCount: -1
      },
      // user的following清單
      followingList: []
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
    this.fetchFollowingsData(userId);
  },
  methods: {
    async fetchProfileData(userId) {
      try {
        const response = await UsersAPI.getUserProfile(userId);
        const { data, statusText} = response;
        if(statusText !== 'OK') throw new Error

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
          title: "無法取得proile資料"
        });
      }
    },
    async fetchFollowingsData(userId) {
      try {
        const response = await UsersAPI.getFollowings(userId);
        const { data, statusText} = response;
        if(statusText !== 'OK') throw new Error
        this.followingList = data.followings;
      } catch {
        Toast.fire({
          icon: "error",
          title: "無法取得Followings資料"
        });
      }
    },
    afterFollow(followingId) {
      console.log("following:", followingId);

      this.followingList = this.followingList.map(following => {
        if (following.id !== followingId) {
          return following;
        } else {
          return {
            ...following,
            followerCount: following.followerCount + 1,
            isFollowed: true
          };
        }
      });
    },
    afterUnfollow(followingId) {
      console.log("unfollowed");
      console.log("unfollowed: ", followingId);

      this.followingList = this.followingList.map(following => {
        if (following.id !== followingId) {
          return following;
        } else {
          return {
            ...following,
            followerCount: following.followerCount - 1,
            isFollowed: false
          };
        }
      });
    },
    afterFollowUser(userId){
      if(userId === this.user.id){
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount + 1,
          isFollowed: true
        }
      }
    },
    afterUnfollowUser(userId){
      if(userId === this.user.id){
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount - 1,
          isFollowed: false
        }
      }
    }
  }
};
</script>>