<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1.p-3(v-for='user in topUsers' :key='user.id')
      .col-3.d-flex.align-items-start.justify-content-center
        img(:src="user.avatar")
      .col-8.text-left
        router-link(:to="{ name: 'user', params: { id:user.id }}") 
          h5 {{user.name}}
        p
          | {{user.introduction}}
        .row.justify-content-end(v-if='user.id != currentUser.id')
          button.btn.btn-danger(v-if="user.isFollowed" @click.stop.prevent="deleteFollow(user.id)") Unfollow 
          button.btn.btn-primary(v-else @click.stop.prevent="addFollow(user.id)") Follow 
</template>


<script>
export default {
  props: {
    topUsers: {
      type: Array,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  methods: {
    addFollow(userId) {
      this.$emit("after-add-follow", userId);
    },
    deleteFollow(userId) {
      this.$emit("after-delete-follow", userId);
    }
  }
};
</script>


<style scoped>
img {
  max-width: 75px;
}
</style>