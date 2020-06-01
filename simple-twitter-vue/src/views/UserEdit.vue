<template>
  <div class="container py-5">
    <UserEditForm :initial-user="user" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import UserEditForm from "../components/UserEditForm";
import UsersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserEditForm
  },
  data() {
    return {
      user: {
        name: "",
        avatar: "",
        introduction: ""
      }
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfileData(userId);
  },
  methods: {
    async fetchProfileData(userId) {
      try {
        console.log("userId: ", userId);
        const response = await UsersAPI.getUserProfile(userId);
        const { data, statusText } = response;
        if (statusText !== "OK") throw new Error();

        this.user = {
          ...this.user,
          name: data.user.name,
          avatar: data.user.avatar,
          introduction: data.user.introduction
        };

        console.log("this user", this.user);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料"
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        // for( let [name, value] of formData.entries()){
        //   console.log(name,': ii',value)
        // }
        const { data } = await UsersAPI.putUser({
          userId: 1,
          formData
        });

        console.log('data: ', data)
        if(data.status !== 'success') throw new Error(data.message)
        // console.log("putUser", data);
        // this.$router.push({ name: 'users-followings', params: { id: this.user.id } })
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error
        });
      }
    }
  }
};
</script>>