<template lang="pug">
    div
      h1 Users
      table.table
        thead.thead-dark
          tr
            th(scope='col' ) #id
            th(scope='col') User
            th(scope='col') Tweets
            th(scope='col') Followers
            th(scope='col') Followings
            th(scope='col') Likes


        tbody
            tr(v-for="user in users" :key='user.id' style="height: 100px")
              th(scope='row') {{user.id}}
              td {{user.name}}
              td {{user.tweetsCount}}
              td {{user.followersCount}}
              td {{user.followingsCount}}
              td {{user.likersCount}}
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>