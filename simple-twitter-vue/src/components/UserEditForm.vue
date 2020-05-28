<template>
  <div class="container mx-auto">
    <form
      @submit.stop.prevent="handleSubmit"
      class="row d-flex mx-auto"
    >
      <!-- image -->
      <div class="form-group col-4 d-flex flex-column align-items-center">
        <img
          v-if="profile.image"
          :src="profile.image"
          class="d-block img-thumbnail mb-4"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
          style="width: 270px"
        />
      </div>

      <!-- name, self-intro input -->
      <div class="form-group col-8">
        <input
          v-model="profile.name"
          id="name"
          type="text"
          name="name"
          class="form-control mb-3"
          placeholder="Your name"
          required
        />

        <div class="form-group">
          <textarea v-model="profile.description" name="description" class="form-control mb-3" id="description" rows="3" style="height: 300px;" 
            placeholder="Type anything about you here...">
          </textarea>
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      profile: {
        name: "",
        image: "",
        description: ""
      }
    };
  },
  created() {
    this.profile = {
      ...this.profile,
      ...this.initialProfile
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.profile.image = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.profile.image = imageURL;
      }
    },
    handleSubmit(e) {
      console.log(e.target)
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
};
</script>