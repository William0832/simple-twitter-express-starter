<template lang="pug">
    form#chat-popup.d-flex.flex-column.container( @submit.prevent.stop="afterSendMessage" style="border: 2px solid black; max-width: 23%; max-height: 48vh; padding: 0; background-color: white;")
      .nav.row.no-gutters(style="background-color: black;")
        img.frame(:src="window.guestUser.avatar")
        p.my-auto.ml-1.mr-auto(style="color: white;") {{ window.guestUser.name }}
        button.btn.cancel(type='button', @click.prevent.stop="closeWindow(window.guestUser.chatId)" style="font-weight: bold; color: white;") X                
      
      //- 顯示對話框的container 
      .chatbox.d-flex.flex-column.container.overflow-auto(style="min-height: 35vh;")
        li.list-unstyled(v-for="(chat, index) in window.messages" :key="index")
          //- 自己的對話條
          .row.mt-3(v-if="chat.userId === currentUser.id")
            div.col-5.ml-auto(style="border: 2px solid black; background-color: black;  border-radius: 30px;")
              p.text-break.my-auto.text-left.py-2(style="color: white;") {{ chat.message }}
          //- 對方的對話條
          .row.mt-3(v-else)
            div.col-5.mr-auto(style="border: 2px solid black; background-color: white; border-radius: 30px; ")
              p.text-break.my-auto.text-left.py-2 {{ chat.message }}

      .input-bar.row.no-gutters
        input.col-10.form-control(type="text" placeholder='Type message..', required='' v-model='message')
        button.col-2.btn(type='submit' style="border: 1px solid black;" v-on:keyup.enter="submit") Send
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chatId: this.window.id,
      guestUserId: this.window.guestUser.userId,
      message: '',
      users: {},
      chatHistoryLength: -1
    };
  },
  sockets: {
    // user收到回覆訊息
    async replyMessage(payload) {
      try {

        this.$socket.emit("PM_guest", {
          userId: this.window.guestUser.userId,
          guestUserId: this.currentUser.id,
          chatId: this.window.guestUser.chatId
        });

        if (this.window.id === payload.chatId) {
          delete payload.chatId;
          this.window.messages.push(payload);
        }
        let chatBox = document.querySelector(".chatbox");

        setTimeout(() => {
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 50);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.afterChatWindowCreated();
    this.$set(this.window, 'messages', []);
  },
  watch: {
    window: function(newValue) {
      this.window.messages = newValue;
      let chatBox = document.querySelector(".chatbox");
      setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 50);
    }
  },
  methods: {
    async afterChatWindowCreated() {
      try {
        this.$socket.emit('fetchChatHistory', {
          chatId: this.window.guestUser.chatId
        });
      } catch (error) {
        console.log(error);
      }
    },
    // user 發送訊息
    async afterSendMessage() {
      try {
        if (this.message) {
          let chatBox = document.querySelector('.chatbox');

          this.$socket.emit('sendMessage', {
            message: this.message,
            userId: this.currentUser.id,
            chatId: this.window.guestUser.chatId
          });

          setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
          }, 1);

          this.message = '';
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeWindow(window) {
      this.$emit('after-close', window);
    }
  }
};
</script>

<style scoped>
.img {
  width: 60px;
  height: 60px;
  padding: 10px;
}

.frame {
  width: 60px;
  height: 60px;
  background-image: '';
  background-size: contain;
  border-radius: 50%;
}
</style>
