<template>
  <div class="mt-4 d-flex flex-column align-items-start">

    <img :src="profile.image" width="250px" height="250px" />

    <div class="mt-2 d-flex flex-column align-items-start">
      <!-- name -->
      <h2 class="title">{{ profile.name }}</h2>

      <!-- description -->
      <p style="width: 300px; text-align: left; word-break: break-all;">{{ profile.description }}</p>
      <!-- ul -->

      <ul class="list-inline list-unstyled">
        <li style="text-align:left;">
          <strong>{{profile.Tweets.length}} </strong>Tweets
        </li>

        <li style="text-align:left;">
          <strong>{{profile.Followings.length}}</strong> followings (追蹤者)
        </li>

        <li style="text-align:left;">
          <strong>{{profile.Followers.length}}</strong> followers (追隨者)
        </li>

        <li style="text-align:left;">
          <strong>{{profile.Likes.length}}</strong> Likes
        </li>
      </ul>

      <div>
        <button
          v-if="isFollowed === false"
          @click.prevent.stop="follow"
          type="submit"
          class="btn btn-primary"
        >追蹤</button>

        <form
          v-else
          @submit.prevent.stop="unfollow"
          action="/following/72?_method=DELETE"
          method="POST"
          style="display: contents;"
        >
          <button type="submit" class="btn btn-danger">取消追蹤</button>
        </form>

        <!-- v-if current user  -->
        <router-link to="/users/1/edit" class="btn btn-primary ml-2">user-edit</router-link>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    initialProfile: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      profile: this.initialProfile,
      isFollowed: this.initialIsFollowed
    }
  },
  methods: {
    follow() {
      this.isFollowed = true;
    },
    unfollow() {
      this.isFollowed = false;
    }
  }
};
</script>>