<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard :is-current-user="isCurrentUser" :initial-user="user" :initial-following-list="currentUserFollowingList" class="col-md-4 mr-auto" />
      <UserFollowerCard :initial-user="user" :initial-following-list="currentUserFollowingList"  class="col-md-8" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowerCard from "../components/UserFollowerCard";

const dummyData = {
  user: {
    id: 2,
    email: "user1@example.com",
    password: "$2a$10$YXb3dTWixmuZszxs8OigreIbBSgpCHwTZG.A6zIPceuckIws7Gi1S",
    name: "user1",
    avatar:
      "https://loremflickr.com/240/240/man,women/?random=59.78751611010069",
    introduction: "totam hic dolor",
    role: "user",
    createdAt: "2020-05-29T00:33:17.000Z",
    updatedAt: "2020-05-29T00:33:17.000Z",
    Followers: [
      {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$7Uj1HYTMVXcjHZFDCkYhyeJ4eS9DRz9JooBeEAdMIJ0E6CXzxfFni",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=10.503503288738237",
        introduction: "hic",
        role: "admin",
        createdAt: "2020-05-29T00:33:16.000Z",
        updatedAt: "2020-05-29T00:33:16.000Z",
        Followship: {
          followerId: 1,
          followingId: 2,
          createdAt: "2020-05-29T00:33:17.000Z",
          updatedAt: "2020-05-29T00:33:17.000Z"
        }
      },
      {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$YXb3dTWixmuZszxs8OigreIbBSgpCHwTZG.A6zIPceuckIws7Gi1S",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=59.78751611010069",
        introduction: "totam hic dolor",
        role: "user",
        createdAt: "2020-05-29T00:33:17.000Z",
        updatedAt: "2020-05-29T00:33:17.000Z",
        Followship: {
          followerId: 2,
          followingId: 2,
          createdAt: "2020-05-29T00:33:17.000Z",
          updatedAt: "2020-05-29T00:33:17.000Z"
        }
      }
    ],
    Followings: [],
    Tweets: [],
    Likes: []
  }
};
const dummyCurrentUser = {
  id: 2,
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
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$YXb3dTWixmuZszxs8OigreIbBSgpCHwTZG.A6zIPceuckIws7Gi1S",
      name: "user1",
      avatar:
        "https://loremflickr.com/240/240/man,women/?random=59.78751611010069",
      introduction: "totam hic dolor",
      role: "user",
      createdAt: "2020-05-29T00:33:17.000Z",
      updatedAt: "2020-05-29T00:33:17.000Z",
      Followship: {
        followerId: 1,
        followingId: 2,
        createdAt: "2020-05-29T00:33:17.000Z",
        updatedAt: "2020-05-29T00:33:17.000Z"
      }
    },
    {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$Y0zEGUzv49/INbNAicXRbuGAMAz1s7eNuwUTDeXCTsLtVdoaB29JW",
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
  ]
};

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
    fetchUserData(userId) {
      // 串API 拿 userId 的 follower 資料
      console.log(userId);
      const { user } = dummyData;
      const {
        id,
        email,
        name,
        avatar,
        introduction,
        role,
        Followings,
        Tweets,
        Likes,
        Followers
      } = user;

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
      this.currentUser = dummyCurrentUser;

      // 判斷currentUser是否在查看自己的profile
      if(this.currentUser.id === Number(userId)){
        this.isCurrentUser = true
      } else {
        this.isCurrentUser = false
      }
    },
    getCurrentUserFollowingList() {
      // 把currentUser follow 的 id們 做成array
      let currentUserFollowingList = this.currentUser.Followings.map(
        user => user.id
      );
      console.log(currentUserFollowingList)
      this.currentUserFollowingList = currentUserFollowingList
    }
  }
};
</script>>