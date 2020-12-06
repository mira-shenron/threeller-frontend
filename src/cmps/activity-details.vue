<template>
  <section class="flex details-container">
    <avatar :image="activity.byMember.imgUrl" :fullname="activity.byMember.fullName" :size="40"></avatar>
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
import utilService from '@/services/util.service.js';
import Avatar from 'vue-avatar-component';

export default {
  props: {
    activity:Object,
  } ,
  components:{
    Avatar
  },
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