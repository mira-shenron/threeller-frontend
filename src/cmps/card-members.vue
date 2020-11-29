<template>
  <div>
    <input class="members-search" type="text" placeholder="Search members" v-model="searchBy"/>
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