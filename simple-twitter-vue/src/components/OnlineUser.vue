<template lang="pug">
  .container.overflow-auto(style="max-height: 700px; width: 395px;")
    button.row.btn.btn-light.my-1.p-3.d-flex.align-items-center(
    @click.prevent.stop="inviteUser(user.id)"
    v-for='user in topUsers' 
    :key='user.id' 
    type='button' style="width:370px;")

      .col-3
        img(:src="user.avatar")
      .col-7.text-center
        //- router-link(:to="{ name: 'user', params: { id:user.id }}") 
        p.my-auto(style='font-size: 0.9rem') {{user.name}}
      .col-1(style='font-size: 0.7rem; color: #7FFF00;')
          font-awesome-icon(icon='circle' size="xs")
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
    },
  },
  methods: {
    addFollow(userId) {
      this.$emit("after-add-follow", userId);
    },
    deleteFollow(userId) {
      this.$emit("after-delete-follow", userId);
    },
    inviteUser(userId){
      this.$emit('after-invite-user', userId)
    }
  }
};
</script>


<style scoped>
img {
  max-width: 65px;
  border-radius: 50%;
}
</style>