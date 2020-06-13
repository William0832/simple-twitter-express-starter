<template lang="pug">
  form.container(@submit.stop.prevent="handleSubmit")
    div.row.form-group.mb-2
      textarea.col-8.form-control(
        v-model="description"
        rows="3"
        name="tweet"
        placeholder='What\'s on your mind?')
      vue-hashtag-textarea.col-4.form-control(
        :option="option"
        ref="vueHashtagTextarea"
        v-on:onChangeHashtag="onChangeHashtag"
        rows="3"
        name="tweet"
      )
      
    //- #collapseExample.collapse.row
    //-   .col.input-group 
    //-     .input-group-prepend
    //-       .input-group-text @
    //-     input.form-control(type='text', ref='search', v-model="googleMapName", placeholder='where are you?')
    .row.d-flex.justify-content-end.mt-2
      //- button.btn.btn-primary.col-2.mr-1(type='button', data-toggle='collapse', data-target='#collapseExample', aria-expanded='false', aria-controls='collapseExample')
      //-   font-awesome-icon(icon="map-marker-alt")
      button.col-2(
        type="submit"
        class="btn btn-primary mr-0") Tweet
</template>

<script>
import VueHashtagTextarea from "vue-hashtag-textarea";
import { v4 as uuidv4 } from 'uuid';


export default {
  components: {
    VueHashtagTextarea
  },
  data() {
    return {
      description: "",
      googleMapName: "",
      googleMapUrl: "",
      autocomplete: null,
      hashtags: [],
      option: {
        content: "",
        defaultContent: "",
        textColor: "black",
        hashtagColor: "#0000ff",
        font: "14 Microsoft JhengHei Light ",
        hashtagBackgroundColor: "#DCDCDC",
        placeholder: "Input your hashtags here..."
      }
    };
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    onChangeHashtag(obj) {
      this.hashtags = obj.hashtags;
    },
    handleSubmit() {
      this.$emit("after-create-tweet", {
        User: {
          id: 15,
          avatar: 'https://mattbermes.files.wordpress.com/2016/01/drunk-cat-couch-potato1.jpg?w=320',
          name: 'Hashtag User',
        },
        id: uuidv4(),
        createdAt: '3hrs ago',
        description: this.description,
        googleMapName: this.googleMapName ? this.googleMapName : null,
        googleMapUrl: this.googleMapUrl ? this.googleMapUrl : null,
        hashtags: this.hashtags
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