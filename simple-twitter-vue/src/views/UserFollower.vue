<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard
        :user="user"
        class="col-md-4 mr-auto"
        @after-follow-user="afterFollowUser"
        @after-unfollow-user="afterUnfollowUser"
      />
      <UserFollowerCard
        :follower-list="followerList"
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
        isCurrentUser: null,
        isFollowed: null,
        tweetsCount: -1,
        followingCount: -1,
        followerCount: -1,
        likeCount: -1
      },
       // user的followers清單
      followerList: []
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
    this.fetchFollowersData(userId);
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
          title: "無法取得資料"
        });
      }
    },
    async fetchFollowersData(userId){
      try {
        const response = await UsersAPI.getFollowers(userId);
        const { data, statusText} = response;
        if(statusText !== 'OK') throw new Error
        this.followerList = data.followers

      } catch {
        Toast.fire({
          icon: "error",
          title: "無法取得Followings資料"
        });
      }
    },
    afterFollow(followerId) {
      console.log("following:", followerId);

      this.followerList = this.followerList.map(follower => {
        if (follower.id !== followerId) {
          return follower;
        } else {
          return {
            ...follower,
            followerCount: follower.followerCount + 1,
            isFollowed: true
          };
        }
      });
    },
    afterUnfollow(followerId) {
      console.log("unfollowed");
      console.log("unfollowed: ", followerId);

      this.followerList = this.followerList.map(follower => {
        if (follower.id !== followerId) {
          return follower;
        } else {
          return {
            ...follower,
            followerCount: follower.followerCount - 1,
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