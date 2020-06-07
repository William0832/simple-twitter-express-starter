<template lang="pug">
    #chat-popup.d-flex.flex-column.container(style="border: 2px solid black; max-width: 23%; max-height: 48vh; padding: 0; background-color: white;")
      .nav.row.no-gutters(style="background-color: black;")
        img(src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover;")
        p.my-auto.ml-1.mr-auto(style="color: white;") userid: {{chatId}}
        button.btn.cancel(type='button', @click.prevent.stop="closeWindow(chatId)" style="font-weight: bold; color: white;") X

      //- 顯示對話框的container 
      .d-flex.flex-column.container.overflow-auto
        //- 自己的對話條
        .row.mt-3
          div.col-5.ml-auto(style="border: 2px solid black; background-color: black;")
            p.text-break(style="color: white") kjfhdkhsdkfkshdkfjhkghfkegehgkjeghkehghgrgsejh
        //- 對方的對話條
        .row.mt-3
          div.col-5.mr-auto(style="border: 2px solid black; background-color: white;")
            p.text-break kjfhdkhdkfhkfhkdfhkdfjfdkhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjsgkerkh

      .input-bar.row.no-gutters
        input.col-10.form-control(type="text" placeholder='Type message..', required='' v-model='message')
        button.col-2.btn(type='submit' style="border: 1px solid black;"  @click.prevent.stop="afterSendMessage" ) Send
</template>

<script>
export default {
  props: {
    // 訊息打包成Array
    // messages:{
    // type: Array,
    // default:{}

    // invitedUser: {
    //   type: Object,
    //   required: true
    // }

    window: {
      type: Object,
      required: true
    }
  },
  data() {
    //- windowIndex: this.windows.length - 1
    return {
      chatId: this.window.id,
      message: ""
    };
  },
  sockets:{
    replyMessage(payload){
      const { message } = payload
      console.log('message: ', message)
    }
  },
  created() {
    this.afterChatWindowCreated();
  },
  methods: {
    closeWindow(window) {
      this.$emit("after-close", window);
    },
    afterChatWindowCreated() {
      this.$socket.emit("fetchChatHistory", { chatId: 111 });
    },
    afterSendMessage() {
      if (this.message) {
        this.$socket.emit("sendMessage", { message: this.message });
        this.message = "";
      //   this.$socket.on('sendMessage', function(message) {
      //     console.log(message)
      //   })
      }
    },
    sendMsg() {
      // emit訊息
    },
    closeWindow(window) {
      this.$emit("after-close", window);
    },
    afterChatWindowCreated() {
      this.$socket.emit("fetchChatHistory", { chatId: 111 });
    },
    afterSendMessage() {
      if (this.message) {
        this.$socket.emit("sendMessage", { message: this.message });
        this.message = "";
      }
    }
  }
};
</script>


<style scoped>
img {
  width: 70px;
  height: 70px;
  padding: 10px;
}

.frame {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: "";
  background-size: contain;
}
</style>
