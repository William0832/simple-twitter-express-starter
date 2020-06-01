<template>
  <div class="container">
    <!-- tweets-panel -->
    <ul class="list-unstyled mt-5">
      <li v-for="tweet in tweets" :key="tweet.id" class="mb-2">
        <div class="card">
          <div class="row d-flex align-items-center">
            <div class="img col-3">
              <img :src="tweet.User.avatar" alt height="150" width="150" class="mx-2" />
            </div>

            <div class="col-8 ml-3 d-flex flex-column align-items-start">
              <p>{{tweet.User.name}}, {{tweet.createdAt | formatTime }}</p>
              <p style="text-align: left; width: 80%;">{{tweet.description}}</p>

              <div class="d-flex justify-content-between" style="width: 130px;">
                <router-link to class="mr-2">Reply({{like.repliesCount}})</router-link>

                <a href v-if="!like.isLiked" @click.prevent.stop="like(like.id)" style="color: red;">Like({{like.likesCount}})</a>
                <a href v-else @click.prevent.stop="unlike(like.id)" style="color: red;">Unlike({{like.likesCount}})</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { timeFilter } from "./../utils/mixins";
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  mixins: [timeFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  methods: {
    async like(tweetId) {
      try {
        const { data } = await UsersAPI.like(tweetId);
        console.log("like", data);

        // if (data.status !== "success") {
        //   throw new Error(data.message);
        // }

        // 通知父層
        this.$emit("after-like", tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入like，請稍後再試"
        });
      }
    },
    async unlike(tweetId) {
      try {
        const { data } = await UsersAPI.unlike(tweetId);
        console.log('unlike data', data)

        // if (data.status !== "success") {
        //   throw new Error(data.message);
        // }

        // 通知父層
        this.$emit("after-unlike", tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消like，請稍後再試"
        });
      }
    },
  }
};
</script>>