<template lang="pug">
  div
    h1 Blocks
    table.table.table-hover
      thead.thead-dark
        tr
          th(scope='col' style="width: 5%") #userId
          th(scope='col' style="width: 50%") name
          th(scope='col') createdAt
          th(scope='col' style="width: 5%") Delete


      tbody
        template(v-for="(block,index) in blocks"  style="height: 50px")
          tr
            th(scope='row') {{block.id}}
            td.h5 {{block.name }}
            td {{block.createdAt | formatTime}}
            td.align-middle
              button.btn-danger(type='button', aria-label='Close' @click.stop.prevent='deteleBlock(block.id)')
                span(aria-hidden='true') ×
</template>

<script>
import { timeFilter } from '../utils/mixins';

export default {
  mixins: [timeFilter],
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  methods: {
    deteleBlock(blockId) {
      this.$emit('after-delete-block', blockId);
    }
  }
};
</script>
