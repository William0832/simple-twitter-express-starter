<template lang="pug">
  .container.overflow-auto(style="max-height: 700px; width: 395px;")
    button.row.btn.btn-light.my-1.p-3.d-flex.align-items-center(
    @click.prevent.stop="inviteUser(user.userId)"
    v-for='user in onlineUsers' 
    :key='user.userId' 
    type='button' style="width:370px;")
      .col-3
        img(:src="user.avatar")
      .col-7.text-center
        p.my-auto(style='font-size: 0.9rem') {{user.name}}
      .col-1(style='font-size: 0.7rem; color: #7FFF00;')
          font-awesome-icon(icon='circle' size="xs")
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  sockets: {
    getOnlineUser(chats) {
      this.onlineUsers = chats
      // console.log('onlineUsers: ', this.onlineUsers)
    },
    getChatId({ chatId }) {
      this.chatId = chatId
      console.log('ococ', this.chatId)
      console.log('onlineUsers: ', this.onlineUsers)
    },
    updateOnlineState(payload) {
      const { userId, isOnline } = payload
      // 上線: 人數不多的情況，暫時利用現有的方法，刷新全部onlineUsers，
      // 但如果刷全部已經太耗費資源，可以改成渲染剛上線的人就好
      this.$socket.emit('fetchOnlineUser', this.currentUser.id)

      // // 離線: 從渲染物件中移除
      if (!isOnline) {
        this.onlineUsers = this.onlineUsers.filter((e) => e.userId !== userId)
      }
    }
  },
  created() {
    this.fetchOnlineUser()
  },
  data() {
    return {
      onlineUsers: [],
      chatId: -1
    }
  },
  methods: {
    async fetchOnlineUser() {
      try {
        await this.$socket.emit('fetchOnlineUser', this.currentUser.id)
      } catch (error) {
        console.error(error)
      }
    },
    async inviteUser(userId) {
      try {
        await this.$socket.emit('inviteUser', {
          invitedUserId: this.currentUser.id,
          guestUser: userId
        })

        let guestUser = this.onlineUsers.filter(
          (user) => user.userId === userId
        )[0]
        console.log('groupUsers', guestUser.chatId)

        setTimeout(() => {
          if (guestUser.chatId === null) guestUser.chatId = this.chatId

          // 傳到父層 /views/Tweets.vue 的method afterInviteUser()
          this.$emit('after-invite-user', userId, guestUser)
        }, 300)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 65px;
  border-radius: 50%;
}
</style>
