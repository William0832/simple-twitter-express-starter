<template>
  <div class="container py-5">
    <UserEditForm :initial-profile="profile" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import UserEditForm from "../components/UserEditForm";
const dummyData = {
  profile: {
    name: "root",
    image: "https://i.imgur.com/58ImzMM.png",
    description: "hi there!"
  }
};

export default {
  components: {
    UserEditForm
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
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
  },
  methods: {
    fetchProfileData(userId) {
      console.log("userId: ", userId);
      const { profile } = dummyData;
      this.profile = {
        ...this.profile,
        name: profile.name,
        image: profile.image,
        description: profile.description
      };
    },
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      console.log(formData.entries())
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    }
  }
};
</script>>