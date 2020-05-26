<template lang="pug">
  nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
    router-link.navbar-brand(to='/')
      | Simple Twitter
    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.navbar-collapse.collapse
      .ml-auto.d-flex.align-items-center
        // is user is admin
        a(href="#")
          | 管理員後台
        // is user is login
        template(v-if="currentUser.isAdmin")
          a(href="#")
            | 使用者 您好
          button.btn.btn-sm.btn-outline-success.my-2.my-sm-0(type='button')
            | 登出
</template>


<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  name: "Navbar",
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    }
  }
};
</script>