<template>
  <div class="container-fluid">
    <div class="row px-5 mx-auto" style="width: 85%;">
      <UserProfileCard :initial-following-list="currentUserFollowingList" :is-current-user="isCurrentUser" :initial-user="user" class="col-md-4 mr-auto" />
      <UserFollowingCard :initial-user="user" :initial-following-list="currentUserFollowingList" class="col-md-8" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingCard from "../components/UserFollowingCard";
import UsersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

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
        const response = await UsersAPI.getFollowings(userId)

        // if(statusText !== 'ok') throw new Error
        const { 
          id,
          email,
          name,
          avatar,
          introduction,
          role,
          Followings
        } = response.data.user
        
        // this.user = response.data.user
        // console.log('this', response.data.user)

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
          // Followersid,
          // Tweetsid,
          // Likes
        },
        console.log('this.user', this.user)
        // 判斷currentUser是否在查看自己的profile        
        // this.currentUser = dummydata
        // if(this.currentUser.id === Number(userId)){
        //   this.isCurrentUser = true
        // } else {
        //   this.isCurrentUser = false
        // }

        this.isCurrentUser = false
      } catch(error){
        Toast.fire({
          icon: 'error',
          title: '無法取得資料'
        })
      }      
    },
    getCurrentUserFollowingList() {
      // // 把currentUser follow 的 id們 做成array
      // let currentUserFollowingList = this.currentUser.Followings.map(
      //   user => user.id
      // );
      // console.log(currentUserFollowingList)
      // this.currentUserFollowingList = currentUserFollowingList
      
      this.currentUserFollowingList = [2, 3] // 暫時
    }
  }
};
</script>>