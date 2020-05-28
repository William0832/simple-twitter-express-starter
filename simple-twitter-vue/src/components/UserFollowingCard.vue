<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Following</h2>
    <!-- cards -->
    <ul class="list-unstyled">

      <div class="row no-gutters d-flex justify-content-around">

        <li v-for="following in profile.Followings" :key="following.id" class="col-6">
          <div class="card" style="width: 98%;">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- image -->
              <div class="col-4">
                <img
                  :src="following.image"
                  alt
                  height="100"
                  width="100"
                />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <h5 class="">{{following.name}}</h5>
                <p
                  style="text-align: left; width: 90%;"
                >{{following.description}}</p>

                <div class="d-flex justify-content-between mb-2" style="width: 130px;">
                  <router-link @click.prevent.stop="follow" class="btn btn-danger">Unfollow</router-link>
                </div>
              </div>
            </div>
          </div>
        </li>

      </div>
    </ul>
    <!-- cards -->

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
      profile: this.initialProfile
    };
  },
   methods: {
    unFollow(){
      // 更改畫面isFollow的狀態
      // 讓後端API改變db資料
    }
  }

};
</script>>