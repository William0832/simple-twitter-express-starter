<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Following</h2>
    <!-- cards -->
    <ul class="list-unstyled">
      <div class="row no-gutters d-flex justify-content-start">
        <li v-for="following in followingList" :key="following.id" class="col-6">
          <div class="card mb-1" style="width: 98%; min-height: 300px;">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- avatar -->
              <div class="col-4">
                <img :src="following.avatar" alt height="100" width="100" />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <h5 class>{{following.name}}</h5>
                <p style="text-align: left; width: 90%;">{{following.introduction}}</p>

                <!-- follow-BTN  -->
                <button
                  v-if="!following.isFollowed"
                  @click.prevent.stop="follow(following.id)"
                  type="button"
                  class="btn btn-primary"
                >追蹤</button>

                <button
                  v-else
                  @click.prevent.stop="unfollow(following.id)"
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
    followingList: {
      type: Array,
      required: true
    }
  },
  methods: {
    async follow(followingId) {
      try {
        const { data } = await UsersAPI.follow(followingId);
        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit("after-follow", followingId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試"
        });
      }
    },
    async unfollow(followingId) {
      try {
        const { data } = await UsersAPI.unfollow(followingId);
        console.log('unfollow data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit("after-unfollow", followingId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    },
  }
};
</script>>