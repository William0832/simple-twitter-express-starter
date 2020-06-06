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
        )    
        //- style="background-color: red;"
    div.row.no-gutters.d-flex.fixed-top
      ChatRoom
    //-   ChatWindow(@after-close="closeWindow" )
    //-   ChatWindow(@after-close="closeWindow" )
</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import UserTop from "../components/UserTop";
import OnlineUser from "../components/OnlineUser";
import ChatWindow from "../components/ChatWindow";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

//api
import tweetsAPI from "../apis/tweet";
import followshipAPI from "../apis/followship";

//test
import ChatRoom from "../components/ChatRoom";

export default {
  components: {
    TweetNew,
    TweetIndex,
    UserTop,
    OnlineUser,
    ChatWindow,
    ChatRoom
  },
  data() {
    return {
      tweets: [],
      topUsers: [],
      windows: []
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchTweets();
    this.socketLogin();
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
    closeWindow() {
      console.log("close window");
      this.openWindow = false;
    },
    socketLogin() {
      this.$socket.emit("login", this.currentUser.id);
    }
  }
};
</script>