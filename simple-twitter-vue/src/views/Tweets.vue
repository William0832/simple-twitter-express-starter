<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
    .row.flex-grow-1.overflow-hidden
      .col-md-8.mh-100.overflow-auto
        TweetNew(
          :user-id='currentUser.id' 
          @after-create-tweet='afterCreateTweet')
        TweetIndex( :tweets='tweets'
          @after-add-like='afterAddLike'
          @after-delete-like='afterDeleteLike')
      .col-md-4.mh-100.overflow-auto 
        ul.nav.nav-tabs
          li.nav-item(
            v-for="tab in tabs" 
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
          )
            a.nav-link(href='#') {{tab}}        
        
        Popular(
          v-if="currentTab === 'Popular'" 
          :top-users='topUsers'
          :current-user='currentUser'
          @after-add-follow='afterAddFollow'
          @after-delete-follow='afterDeleteFollow'
        )
          
        Chat( 
          v-if="currentTab === 'Chat'" 
          :top-users='topUsers'
          :current-user='currentUser'
          @after-invite-user="afterInviteUser"
        )    
    .row.no-gutters.d-flex.justify-content-end.fixed-bottom(style="position:fixed; right:0;")
      ChatWindow(
      v-for="window in windows"
      :key="window.id"
      :window="window"
      @after-close="closeWindow" 
      style="margin: 0 0.3%"
      )
</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import Popular from "../components/UserTop";
import Chat from "../components/OnlineUser";
import ChatWindow from "../components/ChatWindow";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

//api
import tweetsAPI from "../apis/tweet";
import followshipAPI from "../apis/followship";

//test
// import ChatRoom from "../components/ChatRoom";

export default {
  components: {
    TweetNew,
    TweetIndex,
    Popular,
    Chat,
    ChatWindow
  },
  data() {
    return {
      tweets: [],
      topUsers: [],
      windows: [],

      currentTab: "Popular",
      tabs: ["Popular", "Chat"]
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

        const response = await tweetsAPI.tweets.create(tweet);

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
    closeWindow(window) {
      this.windows = this.windows.filter(chat => chat.id !== window);
    },
    afterInviteUser(userId) {
      let windows = this.windows.map(window => window.id);

      if (this.windows.length === 3) {
        return Toast.fire({
          icon: "warning",
          title: "只能開啟3個聊天視窗！"
        });
      } else if (windows.includes(userId)) {
        return;
      } else {
        this.windows.push({
          id: userId
        });
        console.log("current windows: ", this.windows);
      }
    },
    socketLogin() {
      this.$socket.emit("login", this.currentUser.id);
    }
  }
};
</script>
