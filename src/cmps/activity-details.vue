<template>
  <section class="flex details-container">
    <vue-initials-img
      class="avatar"
      :name="activity.byMember.fullName"
    />
    <div>
      <div class="flex align-center">
        <span class="user">{{ activity.byMember.fullName }}</span>
        <span class="action">{{ activity.txt }}</span>
      </div>
      <div class="time">{{ time }}</div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import utilService from '@/services/util.service.js'

export default {
  props: ["activity"],
  data() {
    return {

    }
  },
  methods: {
  },
  created() {

  },
  computed: {
    time() {
      return utilService.showTime(this.activity.createdAt);
      //   return new Date(this.activity.createdAt).toLocaleString();
    }
  }
};
</script>