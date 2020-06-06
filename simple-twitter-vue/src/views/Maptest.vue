<template>
  <div>
    <input type="text" ref="search" v-model="location" />
  </div>
</template>

<script>
// Add google map script if not exist; if exist, return true
window.checkAndAttachMapScript = function(callback) {
  if (window.google) {
    // If you're using vue cli, then directly checking
    // 'google' obj will throw an error at the time of transpiling.
    callback();
    return true;
  }

  window.mapApiInitialized = callback;
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_Google_Map_Key}&libraries=places,geometry&callback=mapApiInitialized`;
  document.body.appendChild(script);
};

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
      autocomplete.addListener("place_changed", function() {
        let place = autocomplete.getPlace();
        if (place && place.address_components) {
          console.log(place.address_components);
        }
      });
    }
  }
};
</script>