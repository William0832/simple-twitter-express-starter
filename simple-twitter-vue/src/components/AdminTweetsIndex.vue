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
        template(v-for="(tweet,index) in tweets"  style="height: 50px")
          tr
            th(scope='row') {{tweet.id}}
            td.text-left {{tweet.description }}
            td.text-left {{tweet.User.name }}
            td {{tweet.createdAt | formatTime}}
            td.align-middle
              button.btn-light(v-if="!tweet.showReplies" type='button', aria-label='Replies' @click='showReplies(index)')
                span(aria-hidden='true') ▼
              button.btn-light(v-else type='button', aria-label='Replies' @click='showReplies(index)')
                span(aria-hidden='true') ▲
            td.align-middle
              button.btn-danger(type='button', aria-label='Close' @click.stop.prevent='deteleTweet(tweet.id)')
                span(aria-hidden='true') ×
          tr.collapse.bg-secondary(style="width: 100%" :ref="tweet.id" :class="{show:tweet.showReplies}")
            td(colspan="6" )
              table.table.table-hover
                thead.thead-light
                  tr
                    th(scope='col' style="width: 5%") #id
                    th(scope='col' style="width: 70%") Reply
                    th(scope='col') User
                tbody
                  tr.text-light(v-for="reply in tweet.Replies"  style="height: 50px")
                    th(scope='row') {{reply.id}}
                    td.text-left {{reply.comment |peek }}
                    td.text-left {{reply.User.name }}
    
</template>

<script>
import { timeFilter } from "../utils/mixins";

export default {
  mixins: [timeFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
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
    showReplies(index) {
      if (this.tweets[index].showReplies) {
        this.tweets[index].showReplies = false;
        return;
      }

      this.tweets.forEach(tweet => {
        tweet.showReplies = false;
      });
      this.tweets[index].showReplies = true;
    }
  }
};
</script>
