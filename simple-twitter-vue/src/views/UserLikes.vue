<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 75%;">
      <UserProfileCard :initial-profile="profile" class="col-md-4 mr-auto" />
      <UserLikeCard class="col-md-7" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserLikeCard from "../components/UserLikeCard";
// // 拿user profile資料的API
// import UsersAPI from '../apis/users'
// // 拿user Likes 資料的API

import { Toast } from '../utils/helpers'

export default {
  components: {
    UserProfileCard,
    UserLikeCard,
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
      try {
        console.log(userId)
        // 從user API 拿資料
        // const response 
        // const { data } = response

        // this.user = {
        //   ...this.user,
        //   id,
        //   email,
        //   name,
        //   avatar,
        //   introduction,
        //   role,
        //   Followings,

        //   // 以下應該要分開
        //   Followers,
        //   Tweets,
        //   Likes        
        // };

        // 從user Likes API 拿資料
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