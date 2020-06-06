<template>
  <div>
    <input type="text" ref="search" v-model="location" />
  </div>
</template>

<script>
// Add google map script if not exist; if exist, return true

export default {
  data: () => ({
    location: null
  }),
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    initLocationSearch() {
      let autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.search
      );
      autocomplete.setTypes(["establishment"]);
      autocomplete.addListener("place_changed", function() {
        let place = autocomplete.getPlace();
        console.log(place);
        if (place && place.address_components) {
          // console.log(place.address_components);
        }
      });
    }
  }
};
</script>