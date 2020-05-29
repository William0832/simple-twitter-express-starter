<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard :initial-user="user" class="col-md-4 mr-auto" />
      <UserFollowingCard :initial-user="user" class="col-md-8" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingCard from "../components/UserFollowingCard";

const dummyData = {
  user: {
    id: 1,
    email: "root@example.com",
    password: "$2a$10$7Uj1HYTMVXcjHZFDCkYhyeJ4eS9DRz9JooBeEAdMIJ0E6CXzxfFni",
    name: "root",
    avatar:
      "https://loremflickr.com/240/240/man,women/?random=10.503503288738237",
    introduction: "hic",
    role: "admin",
    createdAt: "2020-05-29T00:33:16.000Z",
    updatedAt: "2020-05-29T00:33:16.000Z",
    Followings: [
      {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$Y0zEGUzv49/INbNAicXRbuGAMAz1s7eNuwUTDeXCTsLtVdoaB29JW",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=74.56657016049095",
        introduction:
          "Voluptas sequi sint omnis rerum vero sunt minus sint magnam. Veritatis magni et in omnis sed. Autem culpa eos consequatur voluptatem. Aut velit voluptatibus ipsa rerum magnam temporibus reprehenderit nemo omnis.",
        role: "user",
        createdAt: "2020-05-29T00:33:17.000Z",
        updatedAt: "2020-05-29T00:33:17.000Z",
        Followship: {
          followerId: 1,
          followingId: 3,
          createdAt: "2020-05-29T00:33:17.000Z",
          updatedAt: "2020-05-29T00:33:17.000Z"
        }
      }
    ],
    Tweets: [],
    Followers: [],
    Likes: []
  }
};


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
        Likes:[]
      }
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
  },
  methods: {
    fetchProfileData(userId) {
      // 串API 拿 userId 的 follower 資料
      console.log(userId);
      const { user } = dummyData;
      const { id, email, name, avatar, introduction, role, Followings, Tweets, Likes, Followers } = user;
      this.user = {
        ...this.user,
        id,
        email,
        name,
        avatar,
        introduction,
        role,
        Followings,

        Followers,
        Tweets,
        Likes
      };
    }
  }
};
</script>>