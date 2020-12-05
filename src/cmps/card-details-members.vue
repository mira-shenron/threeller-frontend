<template>
  <div class="card-details-members">
    <h3>Members</h3>
    <div class="members-section flex align-center">
      <span v-for="member in members" :key="member._id">
        <avatar :src="imgUrl" :fullname="member.fullName" :size="32"></avatar>
      </span>
    </div>
  </div>
</template>


<script>
import Avatar from "vue-avatar-component";

export default {
  props: {
    card: Object,
    members: Array,
  },
  components: {
    Avatar,
  },
  data() {
    return {};
  },
  computed: {
    imgUrl() {
      return this.$store.getters.loggedInUser.imgUrl;
    },
  },
  methods: {},
  created() {},
};
</script>

