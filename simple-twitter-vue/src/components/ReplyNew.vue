<template lang="pug">
  form.container(@submit.stop.prevent="handleSubmit")
    div.row.form-group.mb-4
      textarea.col.form-control(
        v-model="comment"
        rows="3"
        name="reply"
        placeholder='What\'s on your mind?')
    div.row.d-flex.justify-content-end
      .col-3
          button(
            type="button"
            class="btn btn-link"
            @click="$router.back()") 回上一頁
      .col-3
        button(
            type="submit"
            class="btn btn-primary mr-0") Reply
</template>

<script>
export default {
  props: {
    // userId: {
    //   type: Number,
    //   required: true
    // }
  },
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("after-create-reply", this.comment);
      this.comment = ""; // 將表單內的資料清空
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>