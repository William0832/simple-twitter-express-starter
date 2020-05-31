<template lang="pug">
    div
      h1 Users
      table.table
        thead.thead-dark
          tr
            th(scope='col' ) #id
            th(scope='col' style="width: 50%") Tweet
            th(scope='col') Posted
            th(scope='col') Delete


        tbody
            tr(v-for="tweet in tweets" :key='tweet.id' style="height: 100px")
              th(scope='row') {{tweet.id}}
              td {{tweet.description | peek}}
              td {{tweet.createdAt | fromNow}}
              td.align-middle.d-flex.justify-content-center 
                button.close(type='button', aria-label='Close')
                  span.text-danger(aria-hidden='true') ×
</template>

<script>
export default {};
</script>