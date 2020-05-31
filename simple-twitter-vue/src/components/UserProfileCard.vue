<template>
  <div class="mt-4 d-flex flex-column align-items-start">
    <img :src="user.avatar" width="250px" height="250px" />

    <div class="mt-2 d-flex flex-column align-items-start">
      <!-- name -->
      <h2 class="title">{{ user.name }}</h2>

      <!-- description -->
      <p style="width: 300px; text-align: left; word-break: break-all;">{{ user.introduction }}</p>
      <!-- ul -->

      <ul class="list-inline list-unstyled">
        <li style="text-align:left;">
          <strong>{{user.tweetsCount}}</strong>Tweets
        </li>

        <li style="text-align:left;">
          <strong>{{user.followingCount}}</strong> followings (追蹤者)
        </li>

        <li style="text-align:left;">
          <strong>{{user.followerCount}}</strong> followers (追隨者)
        </li>

        <li style="text-align:left;">
          <strong>{{user.likeCount}}</strong> Likes
        </li>
      </ul>

      <div id="follow-btns">
        <button
          v-if="!user.isFollowed && !user.isCurrentUser"
          @click.prevent.stop="follow(user.id)"
          type="button"
          class="btn btn-primary"
        >追蹤</button>

        <button
          v-else-if="user.isFollowed && !user.isCurrentUser"
          @click.prevent.stop="unfollow(user.id)"
          type="button"
          class="btn btn-danger"
        >取消追蹤</button>

        <router-link v-else :to="{ name: 'users-profile-edit', query: { id: user.id } }" class="btn btn-primary ml-2">edit profile</router-link>

      </div>
    </div>
  </div>
</template>

<script>
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    async follow(userId) {
      try {
        const { data } = await UsersAPI.follow(userId);
        console.log("data", data);

        // 通知父層
        this.$emit("after-follow-user", userId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試"
        });
      }
    },
    async unfollow(userId) {
      try {
        const { data } = await UsersAPI.unfollow(userId);
        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit("after-unfollow-user", userId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    }
  }
};
</script>>