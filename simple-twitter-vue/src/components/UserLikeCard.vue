<template>
  <div class="container">
    <h2 class="mt-5 mb-4 d-flex align-items-start">Like</h2>

    <ul class="list-unstyled">
      <li v-for="like in likes" :key="like.id">
        <div class="card">
          <div class="row d-flex align-items-center">
            <div class="img col-3">
              <img
                :src="like.User.avatar"
                alt
                height="150"
                width="150"
                class="mx-2"
              />
            </div>

            <div class="col-8 ml-3 d-flex flex-column align-items-start">
              <p>{{like.User.name}}, {{like.createdAt | formatTime }}</p>
              <p
                style="text-align: left; width: 80%;"
              >{{like.description}}</p>

              <div class="d-flex justify-content-between" style="width: 130px;">
                <a href>Reply</a>
                <a href>Like</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { timeFilter } from './../utils/mixins'

export default {
  mixins: [timeFilter],
  props: {
    likes: {
      type: Array,
      required: true
    }
  }
};
</script>>