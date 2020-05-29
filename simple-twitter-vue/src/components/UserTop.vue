<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1.p-3(v-for='user in topUsers' :key='user.id')
      .col-3.d-flex.align-items-start.justify-content-center
        img(:src="user.avatar")
      .col-8.text-left
        a(hred='#')
          h5 {{user.name}}
        p
          | {{user.introduction}}
        .row.justify-content-end(v-if='user.id != currentUser.id')
          button.btn.btn-danger(v-if="user.isFollowed" @click.stop.prevent="removeFollow(user.id)") Unfollow 
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
  methods: {}
};
</script>


<style scoped>
img {
  max-width: 75px;
}
</style>