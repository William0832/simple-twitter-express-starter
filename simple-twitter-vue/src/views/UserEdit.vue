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
        id: "",
        name: "",
        avatar: "",
        introduction: "",
        isCurrentUser: null
      }
    };
  },
  created() {
    // 使用者不可以編輯其他人的頁面
    setTimeout(() => {
      if(!this.user.isCurrentUser){
        Toast.fire({
          icon: 'warning',
          title: '使用者不允許編輯其他人的頁面'
        })
        return this.$router.push(`/users/${this.user.id}`)
      }
    }, 500);
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
          id: data.user.id,
          isCurrentUser: data.user.isCurrentUser,
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
        const { data } = await UsersAPI.putUser({
          userId: this.user.id,
          formData
        });
        console.log('data: ', data)
        if(data.status !== 'success') throw new Error(data.message)
        this.$router.push({ name: 'user', params: { id: this.user.id } })
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