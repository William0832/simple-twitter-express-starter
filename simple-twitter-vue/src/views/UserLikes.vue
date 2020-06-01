<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 75%;">
      <UserProfileCard
        :user="user"
        class="col-md-4 mr-auto"
        @after-follow-user="afterFollowUser"
        @after-unfollow-user="afterUnfollowUser"
      />
      <UserLikeCard
        :likes="likes"
        @after-like="afterLike"
        @after-unlike="afterUnlike"
        class="col-md-7"
      />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserLikeCard from "../components/UserLikeCard";
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserProfileCard,
    UserLikeCard
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
      likes: []
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
    this.fetchLikesData(userId);
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
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得proile資料"
        });
      }
    },
    async fetchLikesData(userId) {
      try {
        const response = await UsersAPI.getLikes(userId);
        const { data, statusText } = response;
        if (statusText !== "OK") throw new Error();
        this.likes = data.likes;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得Likes資料"
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
    afterLike(tweetId) {
      this.likes = this.likes.map(like => {
        if (like.id !== tweetId) {
          return like;
        } else {
          return {
            ...like,
            likesCount: like.likesCount + 1,
            isLiked: true
          };
        }
      });
    },
    afterUnlike(tweetId) {
      this.likes = this.likes.map(like => {
        if (like.id !== tweetId) {
          return like;
        } else {
          return {
            ...like,
            likesCount: like.likesCount - 1,
            isLiked: false
          };
        }
      });
    }
  }
};
</script>