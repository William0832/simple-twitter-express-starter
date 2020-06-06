<template lang="pug">
  .container.py-5
    .row
      .col-md-8
        TweetNew(
          :user-id='currentUser.id' 
          @after-create-tweet='afterCreateTweet')
        TweetIndex( :tweets='tweets'
          @after-add-like='afterAddLike'
          @after-delete-like='afterDeleteLike')

      .col-md-4
        ul.nav.nav-tabs
          li.nav-item
            a.nav-link.active(href='#') Popular
          li.nav-item
            a.nav-link(href='#') Chat

          //- UserTop( 
          //-   :top-users='topUsers'
          //-   :current-user='currentUser'
          //-   @after-add-follow='afterAddFollow'
          //-   @after-delete-follow='afterDeleteFollow'
          //-   )
          
        OnlineUser( 
          :top-users='topUsers'
          :current-user='currentUser'
          @after-invite-user="afterInviteUser"
        )    

    .row.no-gutters.d-flex.justify-content-end.fixed-bottom(style="position:fixed; right:0;")
      ChatWindow(
      :key=3
      :window="window3"
      v-if = "isOpen3"
      @after-close="closeWindow" 
      style="margin: 0 0.3%"
      )
      ChatWindow( 
      :key=2
      :window="window2"
      v-if = "isOpen2"
      @after-close="closeWindow" 
      style="margin: 0 0.3%"
      )
      ChatWindow( 
      :key=1
      :window="window1"
      v-if = "isOpen1"
      @after-close="closeWindow" 
      style="margin: 0 0.3%"
      )
</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import UserTop from "../components/UserTop";
import OnlineUser from "../components/OnlineUser";
import ChatWindow from "../components/ChatWindow";
import { Toast } from "../utils/helpers";

//api
import tweetsAPI from "../apis/tweet";
import followshipAPI from "../apis/followship";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    avatar:
      "https://loremflickr.com/240/240/man,women/?random=76.38409798671886",
    role: "admin"
  },
  isAuthenticated: true
};

export default {
  components: {
    TweetNew,
    TweetIndex,
    UserTop,
    OnlineUser,
    ChatWindow
  },
  data() {
    return {
      tweets: [],
      topUsers: [],
      currentUser: dummyUser.currentUser,
      windows: [],
      window1: -1,
      window2: -1,
      window3: -1,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false
    };
  },
  created() {
    this.fetchTweets();
    // this.fetchTopUsers();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets();

        const { data } = response;

        this.tweets = data.tweets;
        this.topUsers = data.topUsers;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推特資料，請稍後再試"
        });
      }
    },
    // fetchTopUsers() {
    //   this.topUsers = dummyTopUsers.topUsers;
    // },
    async afterCreateTweet(tweet) {
      try {
        if (!tweet.description) {
          throw new Error("Tweet can not be empty!");
        }

        if (tweet.description.length > 140) {
          throw new Error("Tweet should be shorter than 140 characters!");
        }

        const response = await tweetsAPI.tweets.create(tweet.description);

        const { data } = response;

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterAddFollow(userId) {
      try {
        const response = await followshipAPI.followship.create(userId);

        const { data } = response;

        console.log(userId);

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterDeleteFollow(userId) {
      try {
        const response = await followshipAPI.followship.delete(userId);

        const { data } = response;

        console.log(userId);

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterAddLike(tweetId) {
      try {
        console.log("afterAddLike", tweetId);
        const response = await tweetsAPI.tweets.like(tweetId);
        console.log("afterAddLike2");
        const { data } = response;

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterDeleteLike(tweetId) {
      try {
        const response = await tweetsAPI.tweets.unlike(tweetId);

        const { data } = response;
        console.log(data);
        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    closeWindow(window){
      let windows = this.windows
      console.log('close windowID: ', window)
      if(windows.indexOf(window) === 2){
        this.isOpen3 = false
      } else if (windows.indexOf(window) === 1) {
        this.isOpen2 === false? this.isOpen3 = false : this.isOpen2 = false
      } else if(windows.indexOf(window) === 0) {
        if(this.isOpen1 === false && this.isOpen2 === false){
          this.isOpen3 = false
        } else if (this.isOpen1 === false && this.isOpen3 === false ) {
          this.isOpen2 = false
        } else if (this.isOpen1 === false){
          this.isOpen2 === false
        }
        else this.isOpen1 = false
      }
      this.windows = this.windows.filter(chatId => chatId !== window)

      console.log(this.window1, this.window2, this.window3)
      // console.log('p',this.windows)

      // this.window2 = windows[1]
      // this.window1 = windows[0]
    },
    afterInviteUser(userId){
      if(this.windows.length === 3){
        return Toast.fire({
          icon: 'warning',
          title: '只能開啟3個聊天視窗！'
        })
      } else if(this.windows.includes(userId)) {
        return
      } else {
        this.windows.push(userId)
        console.log('windows ', this.windows)
        let windows = this.windows
        if(windows.length === 1) {
          this.window1 = windows[0]
          this.isOpen1 = true
        } else if(windows.length === 2) {
          this.window2 = windows[1]          
          this.isOpen2 = true
        } else if(windows.length === 3) {
          this.window3 = windows[2]
          this.isOpen3 = true
        }
      }
    }
  }
};
</script>