<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Following</h2>
    <!-- cards -->
    <ul class="list-unstyled">
      <div class="row no-gutters d-flex justify-content-start">
        <li v-for="following in user.Followings" :key="following.id" class="col-6">
          <div class="card mb-1" style="width: 98%; min-height: 300px;">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- avatar -->
              <div class="col-4">
                <img :src="following.avatar" alt height="100" width="100" />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <h5 class>{{following.name}}</h5>
                <p style="text-align: left; width: 90%; min-height: 90%;">{{following.introduction}}</p>

                <!-- follow-BTN -->
                <div class="d-flex justify-content-between mb-2" style="width: 130px;">
                  <!-- 判斷式可能要改 -->

                  <!-- v-if="follower.Followship.followerId === profile.id" -->
                  <form @submit.prevent.stop="unFollow(following.id)">
                    <button type="submit" class="btn btn-danger">Unfollow</button>
                  </form>

                  <!-- v-else -->
                  <button @click.prevent.stop="follow(following.id)" class="btn btn-primary">Follow</button>
                </div>
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
    initialUser: {
      type: Object,
      required: true
    },
    initialFollowingList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser,
      followingList: this.initialFollowingList
    };
  },
  created() {
    console.log("0", this.initialUser);
    this.user = this.initialUser;
  },
  methods: {
    async follow(userId) {
      try {
        const { data } = await UsersAPI.follow(userId);

        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit('after-follow', userId)

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試"
        });
      }
    },
    async unfollow(userId) {
      try {
        const { data } = await UsersAPI.unfollow({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit('after-unfollow', userId)

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