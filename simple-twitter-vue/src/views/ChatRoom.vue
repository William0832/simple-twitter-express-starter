<template>
  <div>
    <ul id="messages">
      <li v-for="chat in chats" :key="chat.message">{{chat.message}}</li>
    </ul>
    <form action @submit.stop.prevent="afterSubmit">
      <input id="m" autocomplete="off" v-model="message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  data() {
    return {
      message: "",
      chats: []
    };
  },
  components: {
    // HelloWorld
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log("connected");
      this.$socket.emit("login", "userVue");
    },
    chat(msg) {
      console.log("sockets", msg);
      this.chats.push({ message: msg });
    }
  },
  methods: {
    afterSubmit() {
      this.$socket.emit("chat", this.message);
      this.message = "";
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

form {
  background: #000;
  padding: 3px;
  position: fixed;
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
