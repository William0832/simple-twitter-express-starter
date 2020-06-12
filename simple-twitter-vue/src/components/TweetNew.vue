<template lang="pug">
  form.container(@submit.stop.prevent="handleSubmit")
    div.row.form-group.mb-4
      textarea.col.form-control(
        v-model="description"
        rows="3"
        name="tweet"
        placeholder='What\'s on your mind?')
    div.row.d-flex.justify-content-end
      button.col-2(
        type="submit"
        class="btn btn-primary mr-0") Tweet
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      description: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("after-create-tweet", {
        description: this.description
      });
      this.description = ""; // 將表單內的資料清空
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>