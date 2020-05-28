<template>
  <div class="container">
    <!-- title -->
    <h2 class="mt-5 mb-4 d-flex align-items-start">Follower</h2>
    <!-- cards -->
    <ul class="list-unstyled">
      <div class="row no-gutters">
        <li v-for="follower in profile.Followers" :key="follower.id" class="col-6">
          <div class="card" style="width: 98%;">
            <div id="card-contents" class="row no-gutters mt-2">
              <!-- image -->
              <div class="col-4">
                <img :src="follower.image" alt height="100" width="100" />
              </div>

              <!-- user info -->
              <div class="col-8 d-flex flex-column align-items-start">
                <h5 class>{{follower.name}}</h5>
                <p style="text-align: left; width: 90%;">{{follower.description}}</p>

                <div class="d-flex justify-content-between mb-2" style="width: 130px;">
                  <!-- 判斷式可能要改 -->

                  <form 
                    v-if="follower.Followship.followerId === profile.id"
                    @submit.prevent.stop="unFollow"
                  >
                    <button
                      type="submit"
                      
                      class="btn btn-danger"
                    >Unfollow</button>

                  </form>

                  <button v-else @click.prevent.stop="follow" class="btn btn-primary">Follow</button>
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
    follow(){
      // 更改畫面isFollow的狀態
      // 讓後端API改變db資料
    },
    unFollow(){
      // 更改畫面isFollow的狀態
      // 讓後端API改變db資料
    }
  }
};
</script>>