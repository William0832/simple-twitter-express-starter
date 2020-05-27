<template lang="pug">
  .row.border.border-secondary.rounded.my-1
    .col-3.d-flex.align-items-center.justify-content-center
      img(:src="image")
    .col-8.text-left
      h5 @username ,2018-11-04
      p
        | Some quick example text to build on the card title and make up the bulk of the card's content.
      .row.justify-content-start
        .col-2
          h6 Reply
        .col-2
          h6 Like
</template>

<script>
const imageUrl =
  "https://loremflickr.com/240/240/man,women/?random=90.59691100585958";

export default {
  data() {
    return {
      image: imageUrl
    };
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>