<template>
  <div class="card-members">
    <el-input class="members-search search" placeholder="Search members" v-model="searchBy"></el-input>
    <h4>Board Members</h4>
    <div v-for="boardMember in membersToShow" :key="boardMember._id">
        <membercmp :member="boardMember" :card=card></membercmp>
    </div>
    <div class="other-team">Show other team members</div>
  </div>
</template>


<script>
import membercmp from "./member.vue";

export default {
  props: {
    card: Object,
    members: Array
  },
  components: {
      membercmp
  },
  data() {
    return {
        searchBy: ''
    };
  },
  computed: {
      membersToShow(){
          if(!this.searchBy) return this.members;
          else return this.members.filter(member => member.fullName.toLowerCase().includes(this.searchBy.toLowerCase()));
      }
  },
  methods: {
  },
  created(){
  }

};
</script>