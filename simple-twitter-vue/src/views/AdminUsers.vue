<template lang="pug">
   .container.py-5
    AdminNavs
    AdminUsersIndex
</template>

<script>
import AdminNavs from "../components/AdminNavs";
import AdminUsersIndex from "../components/AdminUsersIndex";

export default {
  components: {
    AdminNavs,
    AdminUsersIndex
  }
};
</script>