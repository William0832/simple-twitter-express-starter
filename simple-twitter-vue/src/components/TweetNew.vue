<template lang="pug">
  form.container(@submit.stop.prevent="handleSubmit")
    div.row.form-group.mb-2
      textarea.col.form-control(
        v-model="description"
        rows="3"
        name="tweet"
        placeholder='What\'s on your mind?')
    #collapseExample.collapse.row
      .col.input-group 
        .input-group-prepend
          .input-group-text @
        input.form-control(type='text', ref='search', placeholder='where are you?', v-model='address')
    .row.d-flex.justify-content-end.mt-2
      button.btn.btn-primary.col-2.mr-1(type='button', data-toggle='collapse', data-target='#collapseExample', aria-expanded='false', aria-controls='collapseExample')
        | Check-in
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
      description: "",
      address: "",
      googleMapUrl: ""
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