<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 75%;">
      <UserProfileCard :user="user" class="col-md-4 mr-auto" />
      <!-- <UserTweets class="col-md-7" /> -->
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
// import UserTweets from "../components/UserTweets";

// 拿user profile資料的 API
import UsersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

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
        Followings: [],

        // 以下應該要分開
        Followers: [],
        Tweets: [],
        Likes:[]
      },
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
  },
  methods: {
    async fetchProfileData(userId) {
      try{
        // 從user API 拿資料
        // const response 
        const { data } = response

        this.user = {
          ...this.user,
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followings,

          // 以下應該要分開
          Followers,
          Tweets,
          Likes        
        };

        // 從user tweets API 拿資料
        

      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料'
        })
      }
    }
  }
};
</script>