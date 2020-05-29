<template lang="pug">
  .container.py-5
      .row
        .col-md-8
          TweetNew(
            :user-id='currentUser.id' 
            @after-create-tweet='afterCreateTweet')
          TweetIndex( :tweets='tweets')
        .col-md-4
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

//api
import tweetsAPI from "../apis/tweet";

const dummyTopUsers = {
  topUsers: [
    {
      id: 2,
      name: "user1",
      avatar:
        "https://loremflickr.com/240/240/man,women/?random=58.745905329569716",
      introduction: "Aut dicta quos in itaque eos voluptas. Fugit eveni",
      followers_count: 2,
      isFollowed: true
    },
    {
      id: 1,
      name: "root",
      avatar:
        "https://loremflickr.com/240/240/man,women/?random=76.38409798671886",
      introduction: "Qui sequi officia. Ut quia eos vero quae occaecati",
      followers_count: 0,
      isFollowed: false
    },
    {
      id: 3,
      name: "user2",
      avatar:
        "https://loremflickr.com/240/240/man,women/?random=61.98078135474472",
      introduction: "Dignissimos sapiente occaecati nisi totam. Accusam",
      followers_count: 1,
      isFollowed: true
    }
  ]
};

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
    UserTop
  },
  data() {
    return {
      tweets: [],
      topUsers: [],
      currentUser: dummyUser.currentUser
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

        console.log(data);

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
    afterCreateTweet(tweet) {
      // console.log(tweet);
      this.tweets.unshift({
        id: tweet.id,
        description: tweet.description,
        UserId: this.currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        Replies_count: 0,
        Likes_count: 0,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        }
      });
    },
    afterAddFollow(userId) {
      console.log(userId);
    },
    afterDeleteFollow(userId) {
      console.log(userId);
    }
  }
};
</script>