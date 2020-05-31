<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Follower</h2>
    <!-- cards -->
    <ul class="list-unstyled">
      <div class="row no-gutters">
        <li v-for="follower in followerList" :key="follower.id" class="col-6">
          <div class="card mb-1" style="width: 98%; min-height: 300px;">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- image -->
              <div class="col-4">
                <img :src="follower.avatar" alt height="100" width="100" />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <h5 class>{{follower.name}}</h5>
                <p style="text-align: left; width: 90%;">{{follower.introduction}}</p>

                <!-- follow-BTN  -->
                <button
                  v-if="!follower.isFollowed"
                  @click.prevent.stop="follow(follower.id)"
                  type="button"
                  class="btn btn-primary"
                >追蹤</button>

                <button
                  v-else
                  @click.prevent.stop="unfollow(follower.id)"
                  type="button"
                  class="btn btn-danger"
                >取消追蹤</button>
                
              </div>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <!-- cards -->
  </div>
</template>

<script>
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  props: {
    followerList: {
      type: Array,
      required: true
    }
  },
  methods: {
    async follow(followerId) {
      try {
        const { data } = await UsersAPI.follow(followerId);
        console.log("data", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 通知父層
        this.$emit("after-follow", followerId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試"
        });
      }
    },
    async unfollow(followerId) {
      try {
        const { data } = await UsersAPI.unfollow(followerId);
        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit("after-unfollow", followerId);
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