<template>
  <div>
    <h4>Members</h4>
    <div class="members-section flex align-center">
      <span v-for="member in members" :key="member._id">
        <avatar :fullname="member.fullName" :size="32"></avatar>
      </span>
    </div>
  </div>
</template>


<script>
import Avatar from 'vue-avatar-component';

export default {
  props: {
    card: Object,
    members: Array
  },
  components: {
    Avatar
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
  },
  created() {
  }

};
</script>

