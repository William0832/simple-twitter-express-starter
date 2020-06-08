<template lang="pug">
    #chat-popup.d-flex.flex-column.container(style="border: 2px solid black; max-width: 23%; max-height: 48vh; padding: 0; background-color: white;")
      .nav.row.no-gutters(style="background-color: black;")
        img.frame(:src="window.guestUser.avatar")
        p.my-auto.ml-1.mr-auto(style="color: white;") {{ window.guestUser.name }}
        button.btn.cancel(type='button', @click.prevent.stop="closeWindow(window.guestUser.chatId)" style="font-weight: bold; color: white;") X                
      
      li.list-unstyled
        //- 顯示對話框的container 
        .d-flex.flex-column.container.overflow-auto
          //- 自己的對話條
          .row.mt-3(v-if="sentMessage")
            div.col-5.ml-auto(style="border: 2px solid black; background-color: black;")
              p.text-break(style="color: white") {{ sentMessage }}
          //- 對方的對話條
          .row.mt-3(v-if="repliedMessage")
            div.col-5.mr-auto(style="border: 2px solid black; background-color: white;")
              p.text-break {{ repliedMessage }}

      .input-bar.row.no-gutters
        input.col-10.form-control(type="text" placeholder='Type message..', required='' v-model='message')
        button.col-2.btn(type='submit' style="border: 1px solid black;"  @click.prevent.stop="afterSendMessage" ) Send
</template>

<script>
import { mapState } from "vuex";

const dummyData = {
  users: {
     invitedUsername: 'root',
     guestUserName: 'user1',
     invitedUserAvatar:
      'https://loremflickr.com/240/240/man,women/?random=63.701084733544214',
     guestUserAvatar:
      'https://loremflickr.com/240/240/man,women/?random=63.701084733544214',
     chatroomId: 1 
  },
  msgs: [
    { message: '6/6繼續發大財', userId: 3 },
    { message: '88', userId: 1 },
    { message: 'lol', userId: 3 },
    { message: '晚安', userId: 1 }  
  ]
}

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  props: {

    // 訊息打包成Array
    // messages:{
    // type: Array,
    // default:{}

    window: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chatId: this.window.id,
      repliedMessage: "",
      sentMessage: "",
      guestUserId: this.window.guestUser.userId,
      message: ''
    };
  },
  sockets: {
    // user收到回覆訊息
    async replyMessage(payload) {
      try {
        this.repliedMessage = "";
        const { message } = await payload;
        console.log("message: ", message);
        this.repliedMessage = message;
      } catch (error) {
        console.log(error);
      }
    },
    async getChatHistory({ users, msgs }){
      try {
        console.log('////////////////////// history //////////////////')
        console.log('users: ', users, 'msgs: ', msgs)
      } catch(error){
        console.log(error)
      }
    }
  },
  created() {
    this.afterChatWindowCreated();
  },
  methods: {
    afterChatWindowCreated() {
      // chatId: this.window.guestUser.chatId
      this.$socket.emit("fetchChatHistory", { chatId: 1 });
    },
    // user 發送訊息
    async afterSendMessage() {
      try {
        this.sentMessage = this.message

        if (this.sentMessage) {
          this.$socket.emit("sendMessage", { 
            message: this.sentMessage, 
            guestUserId: this.guestUserId, 
            currentUserId: this.currentUser.id, 
            chatId: this.window.guestUser.chatId 
          });

          this.message = ''
          this.sentMessage = ''
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeWindow(window) {
      this.$emit("after-close", window);
    }
  }
};
</script>


<style scoped>
.img {
  width: 70px;
  height: 70px;
  padding: 10px;
}

.frame{
  width: 70px;
  height: 70px;
  background-image: "";
  background-size: contain;
  border-radius: 50%;
}
</style>
