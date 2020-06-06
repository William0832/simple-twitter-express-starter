<template lang='pug'>
  div
    #map
</template>

<script>
export default {
  name: "Map",
  async mounted() {
    window.checkAndAttachMapScript(this.initializeMap);
  },
  methods: {
    initializeMap() {
      var map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      console.log(map);
    }
  }
};
</script>

<style scoped>
#map {
  height: 400px; /* The height is 400 pixels */
  width: 50%; /* The width is the width of the web page */
  background-color: grey;
}
</style>