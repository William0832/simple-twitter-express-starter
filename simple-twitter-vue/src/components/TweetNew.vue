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
        input.form-control(type='text', ref='search', v-model="googleMapName", placeholder='where are you?')
    .row.d-flex.justify-content-end.mt-2
      button.btn.btn-primary.col-2.mr-1(type='button', data-toggle='collapse', data-target='#collapseExample', aria-expanded='false', aria-controls='collapseExample')
        font-awesome-icon(icon="map-marker-alt")
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
      googleMapName: "",
      googleMapUrl: "",
      autocomplete: null
    };
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    handleSubmit() {
      this.$emit("after-create-tweet", {
        description: this.description,
        googleMapName: this.googleMapName ? this.googleMapName : null,
        googleMapUrl: this.googleMapUrl ? this.googleMapUrl : null
      });
      this.description = ""; // 將表單內的資料清空
      this.googleMapName = "";
      this.googleMapUrl = "";
    },
    initLocationSearch() {
      this.autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.search
      );
      this.autocomplete.setFields(["name", "url"]);
      this.autocomplete.setTypes(["establishment"]);
      this.autocomplete.addListener(
        "place_changed",
        this.autocompletePlaceChanged
      );
    },
    autocompletePlaceChanged() {
      const googleMapSpot = this.autocomplete.getPlace();
      this.googleMapName = googleMapSpot.name;
      this.googleMapUrl = googleMapSpot.url;
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>