<template lang="pug">
  .container.d-flex.flex-column.flex-grow-1.vh-100.overflow-hidden.py-5
    BlockIndex.mh-100.overflow-auto(
      :blocks='this.blocks'
      @after-delete-block ='afterDeleteBlock'
      )
</template>

<script>
import BlockIndex from '../components/BlockIndex';

// api
import BlockApi from '../apis/blocks';

export default {
  components: {
    BlockIndex
  },
  data() {
    return {
      blocks: []
    };
  },
  created() {
    this.fetchBlocks();
  },
  methods: {
    async fetchBlocks() {
      try {
        const res = await BlockApi.getBlocks();
        const { blockers } = res.data;
        this.blocks = blockers;
      } catch (err) {
        console.log(err);
      }
    },
    async afterDeleteBlock(blockingId) {
      try {
        this.blocks = this.blocks.filter((block) => block.id !== blockingId);
        await BlockApi.deleteBlock(blockingId);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
