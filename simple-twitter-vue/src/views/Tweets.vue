<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-4
      .row.flex-grow-1.overflow-hidden
        .col-md-8.mh-100.overflow-auto(v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10")
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
            :current-user='currentUser'
            @after-invite-user="afterInviteUser"
          )    
      .row.no-gutters.d-flex.justify-content-end.fixed-bottom(style="position:fixed; right:0; min-height: 362.1px")
        ChatWindow(
        v-for="window in windows"
        :key="window.id"
        :window="window"
        @after-close="closeWindow" 
        style="margin: 0 0.3%"
        )

      //- 有閒情逸致再做icon縮小按鈕 
      //- div(style="height: 50%")
      //-   button.btn-btn-light(style="border-radius: 50%; background-img: ")

</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import Popular from "../components/UserTop";
import Chat from "../components/OnlineUser";
import ChatWindow from "../components/ChatWindow";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";
import infiniteScroll from "vue-infinite-scroll";

//api
import tweetsAPI from "../apis/tweet";
import followshipAPI from "../apis/followship";

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
      onlineUsers: [],
      windows: [],
      currentTab: "Popular",
      tabs: ["Popular", "Chat"],
      history: [],
      busy: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  async created() {
    await this.fetchTweets(this.tweets.length, 10);
    await this.socketLogin();
    await this.fetchTopUsers();
    this.busy = false;
  },
  sockets: {
    openGuestWindow(data) {
      let { guestUser, userId } = data;
      this.afterInviteUser(userId, guestUser);
    },
    async getChatHistory({ users, msgs }) {
      try {
        // let chatBox = document.querySelector("#chatbox");
        this.history.forEach(h => {
          if (h.chatId === users.chatroomId) {
            h.messages = msgs;
          }

          this.windows.forEach(w => {
            if (w.id === h.chatId) {
              w.messages = h.messages;
            }
          });
        });

        // console.log('使用者們',users)
        // this.users = users;
        // this.messages = msgs;
        // this.window.messages = msgs;
        // this.chatHistoryLength = msgs.length;

        // 讓chatbox保持在最底部
        // setTimeout(() => {
        //   chatBox.scrollTop = chatBox.scrollHeight;
        // }, 1);
      } catch (error) {
        console.error(error);
      }
    }
  },
  directives: { infiniteScroll },
  methods: {
    afterInviteUser(userId, guestUser) {
      let windows = this.windows.map(window => window.id);

      if (this.windows.length === 3) {
        return Toast.fire({
          icon: "warning",
          title: "只能開啟3個聊天視窗！"
        });
      } else if (windows.includes(guestUser.chatId)) {
        return;
      } else {
        this.windows.push({
          id: guestUser.chatId,
          guestUser: guestUser
        });

        windows = this.windows.map(window => window.id);

        if (this.history.length === 0) {
          this.history = [
            {
              chatId: guestUser.chatId,
              messages: []
            }
          ];
        } else {
          this.history.forEach(h => {
            windows.forEach(w => {
              if (h.chatId !== w) {
                this.history = [
                  ...this.history,
                  {
                    chatId: w,
                    messages: []
                  }
                ];
              }
            });
          });
        }
      }
    },
    async fetchTweets(offset, limit) {
      try {
        const response = await tweetsAPI.getTweets(offset, limit);

        const { data } = response;

        this.tweets = this.tweets.concat(data.tweets);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推特資料，請稍後再試"
        });
      }
    },
    async fetchTopUsers() {
      try {
        const response = await tweetsAPI.getTopUsers();

        const { data } = response;

        this.topUsers = data.topUsers;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得風雲人物資料，請稍後再試"
        });
      }
    },
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

        this.tweets.unshift(data.newTweet);
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

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.fetchTopUsers();
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

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.fetchTopUsers();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterAddLike(payload) {
      const { tweetId, index } = payload;

      try {
        const response = await tweetsAPI.tweets.like(tweetId);
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets[index].isLiked = true;
        this.tweets[index].likesCount += 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    async afterDeleteLike(payload) {
      const { tweetId, index } = payload;

      try {
        console.log("tweetId", tweetId, "index", index);
        const response = await tweetsAPI.tweets.unlike(tweetId);
        const { data } = response;

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets[index].isLiked = false;
        this.tweets[index].likesCount -= 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    closeWindow(window) {
      this.windows = this.windows.filter(chat => chat.id !== window);
      this.history = this.history.filter(h => h.chatId !== window);
    },
    socketLogin() {
      this.$socket.emit("login", this.currentUser.id);
    },
    async loadMore() {
      this.busy = true;
      let tweetCountsBeforeLoadMore = this.tweets.length;
      console.log("scroll loading");
      await this.fetchTweets(this.tweets.length, 5);

      // stops loading more data while no more new data in DB
      if (this.tweets.length !== tweetCountsBeforeLoadMore) {
        this.busy = false;
      }
    }
  }
};
</script>
