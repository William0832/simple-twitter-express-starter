<template lang="pug">
  nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
    router-link.navbar-brand(to='/')
      | Simple Twitter
    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.navbar-collapse.collapse
      .ml-auto.d-flex.align-items-center
        // is user is admin
        router-link.text-white.mr-3(:to="{name:'admin-tweets'}" v-if="currentUser.role==roles.admin")
          | 管理員後台
        // is user is login
        router-link.text-white.mr-3(:to="{name: 'user', params: { id: currentUser.id }}")
          | 使用者 您好
        button.btn.btn-sm.btn-outline-success.my-2.my-sm-0(type='button')
          | 登出
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      roles: {
        admin: "admin",
        user: "user"
      }
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  }
};
</script>