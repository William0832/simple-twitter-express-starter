<template lang="pug">
  ul.nav.nav-tabs.mb-4
    li.nav-item(v-for='tab in tabs', :key='tab.id')
      router-link.nav-link(:to='tab.path')
        | {{ tab.title }}
  </template>

<script>
import { v4 as uuid } from "uuid";

export default {
  data() {
    return {
      tabs: [
        {
          id: uuid(),
          title: "Tweets",
          path: "/admin/tweets"
        },
        {
          id: uuid(),
          title: "Users",
          path: "/admin/users"
        }
      ]
    };
  }
};
</script>