<template lang='pug'>
  div
    #map
    form.form-inline(@submit.stop.prevent="handleSubmit")
      .form-group.mx-sm-3.mb-2
        label.sr-only(for='searchPlaces') Place:
        input#searchPlaces.form-control(type='text', placeholder='url' ,v-bind='serchUrl')
      button.btn.btn-primary.mb-2(type='submit' ) Search
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import GoogleMapAPI from "../apis/GoogleMap";

export default {
  name: "Map",
  data: () => ({
    map: null,
    serchUrl: "",
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
    },
    async handleSubmit() {
      console.log("here!");
      try {
        const respond = await GoogleMapAPI.getMapSearch(
          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCb7UPH-39L--Qt1ajwocZZ43pJ955WY6U"
        );

        console.log(respond);
      } catch (error) {
        console.log(error);
      }
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