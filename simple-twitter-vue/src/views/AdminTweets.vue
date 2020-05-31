<template lang="pug">
   .container.py-5
    AdminNavs
    AdminNavs
</template>

<script>
import AdminNavs from "../components/AdminNavs";
import AdminTweetsIndex from "../components/AdminTweetsIndex";

export default {
  components: {
    AdminNavs,
    AdminTweetsIndex
  }
};
</script>