<template lang="pug">
    #chat-popup.d-flex.flex-column.container(style="border: 2px solid black; max-width: 23%; max-height: 48vh; padding: 0; background-color: white;")
      .nav.row.no-gutters(style="background-color: black;")
        img(src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover;")
        p.my-auto.ml-1.mr-auto(style="color: white;") userid: {{chatId}}
        button.btn.cancel(type='button', @click.prevent.stop="closeWindow(chatId)" style="font-weight: bold; color: white;") X

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
        input.col-10.form-control(type="text" placeholder='Type message..', required='' v-model='sentMessage')
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
      repliedMessage: '',
      sentMessage: ''
    };
  },
  sockets:{
    // user收到回覆訊息
    async replyMessage(payload){ 
      try {
        this.repliedMessage = ''
        const { message } = await payload
        console.log('message: ', message)
        this.repliedMessage = message

      } catch(error) {
        console.log(error)
      }
    }
  },
  created() {
    this.afterChatWindowCreated();
  },
  methods: {
    afterChatWindowCreated() {
      this.$socket.emit("fetchChatHistory", { chatId: 111 });
    },
    // user 發送訊息
    async afterSendMessage() {
      try {
        if (this.sentMessage) {
          this.$socket.emit("sendMessage", { message: this.sentMessage });
          this.sentMessage = "";
        }
      } catch(error){
        console.log(error)
      }
    },
    closeWindow(window) {
      this.$emit("after-close", window);
    },
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
