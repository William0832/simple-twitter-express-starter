<template lang="pug">
  .container.overflow-auto(style="max-height: 700px; width: 395px;")
    button.row.btn.btn-light.my-1.p-3.d-flex.align-items-center(
    @click.prevent.stop="inviteUser(user.userId)"
    v-for='user in onlineUsers' 
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  sockets: {
    getOnlineUser(chats) {
      console.log('hey')
      this.onlineUsers = chats
      console.log('onlineUsers: ', this.onlineUsers)
    }
  },
  created() {
    this.fetchOnlineUser();
  },
  data() {
    return {
      onlineUsers: []
    };
  },
  methods: {
    async fetchOnlineUser() {
      try {
        await this.$socket.emit("fetchOnlineUser", this.currentUser.id);
      } catch (error) {
        console.error(error);
      }
    },
    async inviteUser(userId) {
      await this.$socket.emit("inviteUser", {
        invitedUserId: this.currentUser.id,
        guestUser: userId,
      });

      console.log('online', this.onlineUsers)
      
      // let usersId = this.onlineUsers.map(user => user.userId)
      console.log('currentUser: ', this.currentUser.id)
      // console.log('usersId: ', usersId)
      // console.log('userId: ', userId)

      // let guestUser = this.onlineUsers.filter( user => user.userId === userId)
      // console.log('groupUsers', guestUser)

      this.$emit("after-invite-user", userId);
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
