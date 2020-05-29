<template lang="pug">
  .container
    .row.border.border-secondary.rounded.my-1.p-3(v-for='user in topUsers' :key='user.id')
      .col-3.d-flex.align-items-start.justify-content-center
        img(:src="user.avatar")
      .col-8.text-left
        a(hred='#')
          h5 {{user.name}}
        p
          | {{user.introduction}}
        .row.justify-content-end
          button.btn.btn-primary(@click.stop.prevent="addFollow(user.id)") Follow 
</template>


<script>
export default {
  props: {
    topUsers: {
      type: Array,
      required: true
    }
  },
  methods: {}
};
</script>


<style scoped>
img {
  max-width: 75px;
}
</style>