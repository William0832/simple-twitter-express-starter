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
        input.form-control(type='text', ref='search', placeholder='where are you?')
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
      googleMapSpot: {}
    };
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    handleSubmit() {
      this.$emit("after-create-tweet", {
        description: this.description
      });
      this.description = ""; // 將表單內的資料清空
    },
    initLocationSearch() {
      let autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.search
      );
      autocomplete.setFields(["name", "url"]);
      autocomplete.setTypes(["establishment"]);
      autocomplete.addListener("place_changed", function() {
        this.googleMapSpot = autocomplete.getPlace();
        console.log(this.googleMapSpot);
      });
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>