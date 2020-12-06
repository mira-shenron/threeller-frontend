<template>
  <section class="flex menu-activity-container">
    <div class="avatar-container">
    <avatar :image="activity.byMember.imgUrl" :fullname="activity.byMember.fullName" :size="32"></avatar>
    </div>
    <div>
      <div class="activities-text">
        <span class="menu-fullname">{{ activity.byMember.fullName }} </span>
        <span class="menu-action"
          >{{ activity.txt }}
          <a v-if="activity.card" @click="openDetails(activity.card.id)">{{
            activity.card.title
          }}</a>
        </span>
      </div>
      <div class="time">{{ time }}</div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import utilService from "@/services/util.service.js";
import Avatar from "vue-avatar-component";
import { eventBus, OPEN_DETAILS } from "@/services/event-bus.service.js";

export default {
  props: {
    activity: Object,
  },
  components: {
    Avatar,
  },
  data() {
    return {};
  },
  methods: {
    openDetails(cardId) {
      eventBus.$emit(OPEN_DETAILS, cardId);
    },
  },
  computed: {
    time() {
      return utilService.showTime(this.activity.createdAt);
      //   return new Date(this.activity.createdAt).toLocaleString();
    },
  },
};
</script>