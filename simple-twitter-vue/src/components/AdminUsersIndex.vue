<template lang="pug">
    div
      h1 Users
      table.table
        thead.thead-dark
          tr
            th(scope='col' ) 
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.id)') #id
            th(scope='col') 
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.name)') User
            th(scope='col')
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.tweets)') Tweets
            th(scope='col')
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.followers)') Followers
            th(scope='col') 
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.followings)') Followings
            th(scope='col')
              button.btn.btn-dark(@click.stop.prevent ='updateSort(keys.likes)')  Likes


        tbody
            tr(v-for="user in sortedUsers" :key='user.id'  style="height: 100px")
              th(scope='row') {{user.id}}
              td {{user.name}}
              td {{user.tweetsCount}}
              td {{user.followersCount}}
              td {{user.followingsCount}}
              td {{user.likesCount}}
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortKey: 'tweetsCount',
      keys: {
        id: 'id',
        name: 'name',
        tweets: 'tweetsCount',
        followers: 'followersCount',
        followings: 'followingsCount',
        likes: 'likesCount'
      },
      reverse: false
    }
  },
  computed: {
    sortedUsers() {
      if (this.sortKey === 'name') {
        return this.users
          .slice()
          .sort((a, b) =>
            this.reverse
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name)
          )
      } else {
        return this.users
          .slice()
          .sort((a, b) =>
            this.reverse
              ? a[this.sortKey] - b[this.sortKey]
              : b[this.sortKey] - a[this.sortKey]
          )
      }
    }
  },
  methods: {
    updateSort(key) {
      if (key === this.sortKey) {
        this.reverse = !this.reverse
      } else {
        this.reverse = false
      }
      this.sortKey = key
    }
  }
}
</script>
