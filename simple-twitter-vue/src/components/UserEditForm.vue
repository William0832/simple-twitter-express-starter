<template>
  <div class="container mx-auto">
    <form @submit.stop.prevent="handleSubmit" class="row d-flex mx-auto">
      <!-- image -->
      <div class="form-group col-4 d-flex flex-column align-items-center">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          class="d-block img-thumbnail mb-4"
          width="200"
          height="200"
        />
        <input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
          style="width: 270px"
        />
      </div>

      <!-- name, self-intro input -->
      <div class="form-group col-8">
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control mb-3"
          placeholder="Your name"
          required
        />

        <div class="form-group">
          <textarea
            v-model="user.introduction"
            name="introduction"
            class="form-control mb-3"
            id="introduction"
            rows="3"
            style="height: 300px;"
            placeholder="Type anything about you here..."
          ></textarea>
        </div>

        <button :disabled="user.isCurrentUser === false || isProcessing === true" type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: {
        name: "",
        avatar: "",
        introduction: "",
        isCurrentUser: null
      },
      isProcessing: false
    };
  },
  watch: {
    initialUser(newValue){
       this.user = {
        ...this.user,
        ...newValue
      };
    }
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.avatar = "";
      } else {
        const avatarURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = avatarURL;
      }
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true
        const form = e.target;
        const formData = new FormData(form);
        this.$emit("after-submit", formData);
      } catch (error) {
        this.isProcessing = false
        Toast.fire ({
          icon: 'error',
          title: '編輯資料時發生錯誤'
        })
      }
    }
  }
};
</script>