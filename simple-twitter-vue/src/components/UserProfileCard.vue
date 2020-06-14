<template>
  <div class="mt-4 d-flex flex-column align-items-start">
    <img :src="user.avatar" width="250px" height="250px" />

    <div class="mt-2 d-flex flex-column align-items-start">
      <!-- name -->
      <h2 class="title">{{ user.name }}</h2>

      <!-- description -->
      <p style="width: 300px; text-align: left; word-break: break-all;">
        {{ user.introduction }}
      </p>

      <ul class="list-inline list-unstyled">
        <li style="text-align:left;">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <strong>{{ user.tweetsCount }} </strong>Tweets
          </router-link>
        </li>

        <li style="text-align:left;">
          <router-link
            :to="{ name: 'users-followings', params: { id: user.id } }"
          >
            <strong>{{ user.followingCount }}</strong> followings (追蹤者)
          </router-link>
        </li>

        <li style="text-align:left;">
          <router-link
            :to="{ name: 'users-followers', params: { id: user.id } }"
          >
            <strong>{{ user.followerCount }}</strong> followers (追隨者)
          </router-link>
        </li>

        <li style="text-align:left;">
          <router-link :to="{ name: 'users-likes', params: { id: user.id } }">
            <strong>{{ user.likeCount }}</strong> Likes
          </router-link>
        </li>
      </ul>
      <div class="d-flex">
        <div id="follow-btns">
          <button
            :disabled="isProcessing"
            v-if="!user.isFollowed && !user.isCurrentUser"
            @click.prevent.stop="follow(user.id)"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>

          <button
            :disabled="isProcessing"
            v-else-if="user.isFollowed && !user.isCurrentUser"
            @click.prevent.stop="unfollow(user.id)"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>

          <router-link
            v-else
            :to="{ name: 'users-profile-edit', query: { id: user.id } }"
            class="btn btn-primary ml-2"
            >edit profile</router-link
          >
        </div>
        <div id="block-btns" class="ml-4">
          <button
            :disabled="isProcessing"
            v-if="!user.isBlocked && !user.isCurrentUser"
            @click.prevent.stop="block(user.id)"
            type="button"
            class="btn btn-secondary "
          >
            封鎖
          </button>
          <button
            :disabled="isProcessing"
            v-else-if="user.isBlocked && !user.isCurrentUser"
            @click.prevent.stop="unblock(user.id)"
            type="button"
            class="btn btn-warning"
          >
            取消封鎖
          </button>
          <router-link v-else :to="{ name: 'blocks' }" class="btn btn-dark"
            >封鎖清單
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersAPI from '../apis/users';
import BlocksAPI from '../apis/blocks';

import { Toast } from '../utils/helpers';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async follow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await UsersAPI.follow(userId);
        console.log('data', data);

        // 通知父層
        this.$emit('after-follow-user', userId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        });
      }
    },
    async unfollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await UsersAPI.unfollow(userId);
        console.log('data', data);

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        // 通知父層
        this.$emit('after-unfollow-user', userId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        });
      }
    },
    async block(userId) {
      try {
        this.isProcessing = true;
        await BlocksAPI.postBlock(userId);
        // if (data.state !== 'success') {
        //   throw new Error(data.message);
        // }
        this.$emit('after-block-user', userId);

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: '封鎖失敗，請稍後再嘗試'
        });
      }
    },
    async unblock(userId) {
      try {
        this.isProcessing = true;
        const { data } = await BlocksAPI.deleteBlock(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
        this.$emit('after-unblock-user', userId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: error.toString()
        });
      }
    }
  }
};
</script>
>
