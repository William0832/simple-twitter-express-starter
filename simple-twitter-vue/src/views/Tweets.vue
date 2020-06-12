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
          h4 Popular users
          UserTop( 
            :top-users='topUsers'
            :current-user='currentUser'
            @after-add-follow='afterAddFollow'
            @after-delete-follow='afterDeleteFollow'
            )
</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import UserTop from "../components/UserTop";
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
    UserTop
  },
  data() {
    return {
      tweets: [],
      topUsers: [],
      busy: true
    };
  },
  async created() {
    await this.fetchTweets(this.tweets.length, 10);
    await this.fetchTopUsers();
    this.busy = false;
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  directives: { infiniteScroll },
  methods: {
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

        console.log(userId);

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

        //add statusText
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