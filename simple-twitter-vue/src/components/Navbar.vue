<template lang="pug">
  nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
    router-link.navbar-brand(to='/')
      img.d-inline-block.align-top(src='https://www.shareicon.net/data/48x48/2015/06/21/57599_angry-birds_512x512.png', width='30', height='30', alt='')
      |  Simple Twitter
     
  

    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.navbar-collapse.collapse(v-if='isAuthenticated')
      .ml-auto.d-flex.align-items-center
        //小鈴鐺
        .dropdown.mx-2
          button#dropdownMenuButton.btn.btn-secondary(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false'  @click='fetchNotifications')
            font-awesome-icon(icon="bell")
            span.badge.badge-light(v-if='notificationCounts >0 ') {{notificationCounts}}
          .dropdown-menu.dropdown-menu-right(aria-labelledby='dropdownMenuButton')
           .dropdown-item(v-for='notification in notifications') 
            router-link(:to="{name: 'replies', params: { tweet_id: notification.tweetId }}" ) {{notification.message}}
        // is user is admin
        router-link.text-white.mx-2(:to="{name:'admin-tweets'}" v-if="currentUser.role==roles.admin")
          | 管理員後台
        // is user is login
        router-link.text-white.mx-2(:to="{name: 'user', params: { id: currentUser.id }}" )
          | 使用者 {{currentUser.name}} ,您好
        button.btn.btn-sm.btn-outline-success.my-2.my-sm-0(type='button'  @click="logout" )
          | 登出
</template>

<script>
import { mapState } from "vuex";
import $ from "jquery";

$(function() {
  $('[data-toggle="popover"]').popover();
});

export default {
  name: "Navbar",
  data() {
    return {
      roles: {
        admin: "admin",
        user: "user"
      },
      notifications: [],
      notificationCounts: -1
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  sockets: {
    returnNotifications(notifications) {
      console.log("returnNotifications");
      this.notifications = notifications;
    },
    returnNotificationCounts(counts) {
      console.log("returnNotificationCounts");
      this.notificationCounts = counts;
    },
    newNotifications() {
      console.log("newReply");
      this.fetchNotificationCounts();
    }
  },
  mounted() {
    this.fetchNotificationCounts();
  },
  methods: {
    async logout() {
      await this.$socket.emit("logout", this.currentUser.id);
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
    async fetchNotifications() {
      await this.$socket.emit("getNotifiations", this.currentUser.id);
      this.fetchNotificationCounts();
    },
    fetchNotificationCounts() {
      console.log("fetchNotificationCounts");
      this.$socket.emit("getNotifiationCounts", this.currentUser.id);
    }
  }
};
</script>
