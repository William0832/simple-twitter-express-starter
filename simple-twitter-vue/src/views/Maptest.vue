<template>
  <div>
    <input type="text" ref="search" v-model="location" />
  </div>
</template>

<script>
// Add google map script if not exist; if exist, return true

export default {
  data: () => ({
    location: null,
    autocomplete: null
  }),
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    initLocationSearch() {
      this.autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.search
      );
      this.autocomplete.setTypes(["establishment"]);
      this.autocomplete.addListener("place_changed", function() {
        let place = this.autocomplete.getPlace();
        console.log(place);
        if (place && place.address_components) {
          // console.log(place.address_components);
        }
      });
    }
    // autocompletePlaceChanged(){

    // }
  }
};
</script>