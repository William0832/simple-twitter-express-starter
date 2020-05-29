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
          <strong>{{user.Tweets.length}} </strong>Tweets
        </li>

        <li style="text-align:left;">
          <strong>{{user.Followings.length}}</strong> followings (追蹤者)
        </li>

        <li style="text-align:left;">
          <strong>{{user.Followers.length}}</strong> followers (追隨者)
        </li>

        <li style="text-align:left;">
          <strong>{{user.Likes.length}}</strong> Likes
        </li>
      </ul>

      <div id='follow-btns'>
        <button
          v-if="followingList.includes(user.id) && !isCurrent"   
          @click.prevent.stop="follow"
          type="submit"
          class="btn btn-primary"
        >追蹤</button>

        <!-- v-else -->
        <form
          v-else-if="!followingList.includes(user.id) && !isCurrent"
          @submit.prevent.stop="unfollow"
          action="/following/72?_method=DELETE"
          method="POST"
          style="display: contents;"
        >
          <button type="submit" class="btn btn-danger">取消追蹤</button>
        </form>

        <!-- v-if current user  -->
        <router-link v-else to="/users/1/edit" class="btn btn-primary ml-2">edit profile</router-link>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    initialFollowingList: {
      type: Array,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      user: this.initialUser,
      followingList: this.initialFollowingList,
      isCurrent: this.isCurrentUser
    }
  },
  methods: {
    follow() {
      // this.isFollowed = true;
    },
    unfollow() {
      // this.isFollowed = false;
    }
  }
};
</script>>