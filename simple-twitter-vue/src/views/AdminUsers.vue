<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
    AdminNavs
    AdminUsersIndex.mh-100.overflow-auto(:users='users')
</template>

<script>
import AdminNavs from "../components/AdminNavs";
import AdminUsersIndex from "../components/AdminUsersIndex";

// api
import adminAPI from "../apis/admin";

export default {
  components: {
    AdminNavs,
    AdminUsersIndex
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await adminAPI.getUsers();
        const { users } = res.data;
        this.users = users;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
