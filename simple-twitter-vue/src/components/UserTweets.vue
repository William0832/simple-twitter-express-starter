<template>
  <div class="container">
    <!-- tweets-panel -->
    <ul class="list-unstyled mt-5">
      <li v-for="tweet in tweets" :key="tweet.id" class="mb-2">
        <div class="card">
          <div class="row d-flex align-items-center">
            <div class="img col-3">
              <img :src="tweet.User.avatar" alt height="150" width="150" class="mx-2" />
            </div>

            <div class="col-8 ml-3 d-flex flex-column align-items-start">
              <p>{{tweet.User.name}}, {{tweet.createdAt | formatTime }}</p>
              <p style="text-align: left; width: 80%;">{{tweet.description}}</p>

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
import { timeFilter } from "./../utils/mixins";

export default {
  mixins: [timeFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  }
};
</script>>