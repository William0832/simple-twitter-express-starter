<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
    .row.flex-grow-1.overflow-hidden
      .col-md-2.mh-100  
        h4(style="color: blue; font-weight: bold;") {{hashtag}}
        h6 
          router-link(to="/hashtag") 回到/hashtag
      .col-md-10.mh-100.overflow-auto
        TweetNew(
          :user-id='currentUser.id' 
          @after-create-tweet='afterCreateTweet')
        TweetIndex( :tweets='tweets')
</template>

<script>
import TweetNew from "../components/HashtagNew";
import TweetIndex from "../components/TweetIndex";

import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

//api
// import tweetsAPI from '../apis/tweet'
// import followshipAPI from '../apis/followship'

let dummyData = [
  {
    User: {
      id: 1,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: "Danny"
    },
    id: 1,
    createdAt: "2019-06-12",
    description: "我沒有偷吃點心",
    hashtagId: 1,
    hashtags: ["#dog"]
  },
  {
    User: {
      id: 2,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: "dog person"
    },
    id: 2,
    createdAt: "2019-06-12",
    description: "你丟我撿",
    hashtagId: 2,
    hashtags: ["#dog"]
  },
  {
    User: {
      id: 3,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: "Cindy"
    },
    id: 3,
    createdAt: "2019-06-12",
    description: "中山大學!",
    hashtagId: 3,
    hashtags: ["#高雄"]
  },
  {
    User: {
      id: 4,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: " Fanny Wang"
    },
    id: 4,
    createdAt: "2020-06-12",
    description: "壽山動物園!",
    hashtagId: 4,
    hashtags: ["#高雄", "#dog", "#zoo"]
  },
  {
    User: {
      id: 5,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: "Yvette"
    },
    id: 5,
    createdAt: "2019-03-12",
    description: "Just waked up at 3p.m. ",
    hashtagId: 5,
    hashtags: ["#耍廢"]
  },
  {
    User: {
      id: 6,
      avatar:
        "https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320",
      name: "Mandy Yang"
    },
    id: 6,
    createdAt: "2019-05-12",
    description: "eating all day long…",
    hashtagId: 6,
    hashtags: ["#耍廢"]
  }
];

export default {
  components: {
    TweetNew,
    TweetIndex
  },
  data() {
    return {
      tweets: [],
      hashtag: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  watch: {
    $route(to) {
      this.hashtag = to.params.hashtag;
      if(this.hashtag !== undefined) {
        let tweets = dummyData.filter(d => d.hashtags.includes(this.hashtag));
        return this.tweets = tweets;
      } 
      this.tweets = dummyData;
    }
  },
  async created() {
    await this.socketLogin();
    await this.fetchTweets();
    this.hashtag = this.$route.params.hashtag;
  },
  methods: {
    async fetchTweets() {
      try {
        if (this.$route.params.hashtag !== undefined) {
          let tweets = dummyData.filter(d =>
            d.hashtags.includes(this.$route.params.hashtag)
          );
          return this.tweets = tweets;
        }
        this.tweets = dummyData;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推特資料，請稍後再試"
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

        this.tweets.push(tweet);

        console.log(tweet);

        // const response = await tweetsAPI.tweets.create(tweet)

        // const { data } = response

        // add statusText
        // if (data.status !== 'success') {
        //   throw new Error(data.message)
        // }

        // this.fetchTweets()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    },
    // async afterAddFollow(userId) {
    //   try {
    //     const response = await followshipAPI.followship.create(userId)
    //     const { data } = response
    //     //add statusText
    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }
    //     this.fetchTopUsers()
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error
    //     })
    //   }
    // },
    // async afterDeleteFollow(userId) {
    //   try {
    //     const response = await followshipAPI.followship.delete(userId)
    //     const { data } = response

    //     //add statusText
    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }

    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error
    //     })
    //   }
    // },
    // async afterAddLike(tweetId) {
    //   try {
    //     const response = await tweetsAPI.tweets.like(tweetId)
    //     const { data } = response

    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }

    //     this.fetchTweets()
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error
    //     })
    //   }
    // },
    // async afterDeleteLike(tweetId) {
    //   try {
    //     const response = await tweetsAPI.tweets.unlike(tweetId)
    //     const { data } = response
    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }
    //     this.fetchTweets()
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error
    //     })
    //   }
    // },
    socketLogin() {
      this.$socket.emit("login", this.currentUser.id);
    }
  }
};
</script>
