<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard :user="user" class="col-md-4 mr-auto" />
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
    this.fetchFollowingsData(userId)
  },
  methods: {
    async fetchProfileData(userId) {
      try {
        const response = await UsersAPI.getUserProfile(userId);
        const{ data } = response
        // , statusText
        // if(statusText !== 'ok') throw new Error

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
    async fetchFollowingsData(userId){
      try {
        const response = await UsersAPI.getFollowings(userId);
        const{ data } = response
        this.followingList = data.followings
      } catch {
        Toast.fire({
          icon: "error",
          title: "無法取得Followings資料"
        });
      }
    },
    afterFollow(followingId) {
      console.log("followed");
      console.log("followingId", followingId)
      console.log(this.followingList)

      
      // if(this.user.id !== userId){
      //   console.log(this.user.id, userId)
      // }

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
    afterUnfollow(userId) {
      console.log("unfollowed");

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