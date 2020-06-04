<template lang='pug'>
  div.container
    ul#messages
      li(v-for='chat in chats', :key='chat.message') {{chat.message}}
    div.row
      form.col-9.chat(action='', @submit.stop.prevent='afterSubmitMessage')
        input#m(autocomplete='off', v-model='message')
        button(type='submit') Send
    div.row
      form.col.invite(action='', @submit.stop.prevent='afterChangeName')
        input#m(autocomplete='off', v-model='user') 
        button(type='submit') Me
      form.col.invite(action='', @submit.stop.prevent='afterInvite')
        input#m(autocomplete='off', v-model='invite')
        button(type='submit') Invite
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  data() {
    return {
      message: "",
      chats: [],
      invite: "",
      user: `vue${this.$route.params.id}`
    };
  },
  components: {
    // HelloWorld
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log("connected");
      this.$socket.emit("login", this.user);
    },
    disconnect() {
      console.log("disconnected");
      // this.$socket.emit("logout", "userVue");
    },
    chat(msg) {
      console.log("sockets", msg);
      this.chats.push({ message: msg });
    }
  },
  methods: {
    afterSubmitMessage() {
      this.$socket.emit("chat", { msg: this.message, room: "room1" });
      this.message = "";
    },
    afterInvite() {
      this.$socket.emit("invite", { user: this.invite, room: "room1" });
    },
    afterChangeName() {
      this.$socket.emit("login", this.user);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font: 13px Helvetica, Arial;
}

form.chat {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
}

form.invite {
  background: #000;
  padding: 3px;
  /* position: fixed; */
  bottom: 0;
  width: 100%;
}

form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}

form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}
</style>
