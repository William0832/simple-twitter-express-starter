<template lang="pug">
  div
    h1 Tweets
    table.table.table-hover
      thead.thead-dark
        tr
          th(scope='col' style="width: 5%") #id
          th(scope='col' style="width: 50%") Tweet
          th(scope='col') User
          th(scope='col' style="width: 20%") Posted
          th(scope='col' style="width: 5%") Replies
          th(scope='col' style="width: 5%") Delete


      tbody
        template(v-for="tweet in tweets"  style="height: 50px")
          tr
            th(scope='row') {{tweet.id}}
            td.text-left {{tweet.description }}
            td.text-left {{tweet.User.name }}
            td {{tweet.createdAt | formatTime}}
            td.align-middle
              button.btn-light(type='button', aria-label='Replies' @click='fetchReplies(tweet.id)')
                span(aria-hidden='true') ▼
            td.align-middle
              button.btn-danger(type='button', aria-label='Close' @click.stop.prevent='deteleTweet(tweet.id)')
                span(aria-hidden='true') ×
          tr.collapse.bg-secondary(style="width: 100%" :ref="tweet.id" :class="{show:collapsed}")
            td(colspan="6" )
              table.table.table-hover
                thead.thead-light
                  tr
                    th(scope='col' style="width: 5%") #id
                    th(scope='col' style="width: 80%") Reply
                    th(scope='col') User
                tbody
                  tr
                    th(scope='row') {{tweet.id}}
                    td.text-left {{tweet.description }}
                    td.text-left {{tweet.User.name }}
    
</template>

<script>
import { timeFilter } from "../utils/mixins";
import adminAPI from "../apis/admin";

export default {
  mixins: [timeFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      replies: {},
      collapsed: false
    };
  },
  created() {
    this.tweets.forEach(tweet => {
      console.log(tweet.id);
      this.replies[tweet.id] = [];
    });
  },
  filters: {
    peek(description) {
      if (description.length > 50) {
        return `${description.substr(0, 50)} ...`;
      }
      return description ? description : "-";
    }
  },
  methods: {
    deteleTweet(tweetId) {
      this.$emit("after-delete-tweet", tweetId);
    },
    async fetchReplies(tweetId) {
      this.collapsed = false;
      console.log(this.$refs.tweetId);
      this.$refs.tweetId.classList.toggle("show");

      try {
        const res = await adminAPI.getReplies(tweetId);
        const { replies } = res.data;
        console.log(replies);

        this.replies[tweetId] = replies;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
