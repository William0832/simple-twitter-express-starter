<template>
  <div id="map"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "Map",
  data: () => ({
    map: null,
    apiKey: process.env.VUE_APP_Google_Map_Key
  }),
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      var uluru = { lat: -25.344, lng: 131.036 };
      this.map = new this.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru
      });
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