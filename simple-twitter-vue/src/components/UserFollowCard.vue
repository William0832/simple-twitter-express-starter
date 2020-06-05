<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Follower</h2>
    <!-- cards -->
    <ul class="list-unstyled">
      <div class="row no-gutters">
        <li v-for="follower in followList" :key="follower.id" class="col-6">
          <div class="card m-1 p-3">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- image -->
              <div class="col-4">
                <img :src="follower.avatar" alt height="100" width="100" />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <router-link :to="{ name: 'user', params: { id: follower.id }}">
                  <h5 class>{{follower.name}}</h5>
                </router-link>
                <p style="text-align: left; width: 90%;">{{follower.introduction | peek}}</p>

                <!-- follow-BTN  -->
                <button
                  :disabled="isProcessing"
                  v-if="!follower.isFollowed"
                  @click.prevent.stop="follow(follower.id)"
                  type="button"
                  class="btn btn-primary"
                >追蹤</button>

                <button
                  :disabled="isProcessing"
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
    followList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
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
    async follow(followerId) {
      try {
        this.isProcessing = true;
        const { data } = await UsersAPI.follow(followerId);
        console.log("data", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 通知父層
        this.$emit("after-follow", followerId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試"
        });
      }
    },
    async unfollow(followerId) {
      try {
        this.isProcessing = true;
        const { data } = await UsersAPI.unfollow(followerId);
        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit("after-unfollow", followerId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    }
  }
};
</script>>