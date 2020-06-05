<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <input
          v-model="passwordCheck"
          id="password-check"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password Check"
          autocomplete="new-password"
          required
        />
      </div>

      <button :disabled="isProcessing" class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">Sign In</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
    
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "請填入完整的 email、password 資訊"
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signUp({
          email: this.email,
          password: this.password,
          name: this.name? this.name : 'user name',
          passwordCheck: this.passwordCheck
        });

        const { data } = response;

        console.log("data", data);

        //add statusText
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.$router.push("/signin");
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼"
        });
        console.log(error);
      }
    }
  }
};
</script>