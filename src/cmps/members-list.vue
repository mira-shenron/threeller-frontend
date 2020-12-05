<template>
  <div class="members-list-container">
    <div class="header flex space-between align-center">
      <span>Add Members</span>
      <span class="x-button" @click.stop="closeMembersList">
        <i class="el-icon-close"></i>
      </span>
    </div>
    <div class="card-members">
      <el-input
        class="members-search"
        placeholder="Search members"
        v-model="searchBy"
      ></el-input>
      <div v-for="member in membersToShow" :key="member._id">
        <div class="names-container flex align-center">
          <avatar :image="member.imgUrl" :fullname="member.fullName" :size="32"></avatar>
          <span class="clickable" @click.stop="addToBoard(member)">
            {{ member.fullName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus, CLOSE_MEMBERS_LIST, SAVE_ORIG_BOARD } from "@/services/event-bus.service.js";
import Avatar from 'vue-avatar-component';

export default {
  props: {
    board: Object,
  },
  components: {
    Avatar
  },
  data() {
    return {
      searchBy: '',
      members: []
    };
  },
  computed: {
    membersToShow() {
      if (!this.searchBy) return this.members;
      else return this.members.filter(member => member.fullName.toLowerCase().includes(this.searchBy.toLowerCase()));
    },
  },
  methods: {
    closeMembersList() {
      eventBus.$emit(CLOSE_MEMBERS_LIST);
    },
    addToBoard(member) {
      var idx = this.board.members.findIndex(mem => mem._id === member._id);
      if (idx === -1) {
        this.board.members.push(member);
        eventBus.$emit(SAVE_ORIG_BOARD, this.board);
        eventBus.$emit(CLOSE_MEMBERS_LIST);
      }
    }
  },
  created() {
    console.log(this.$store.getters.users);
    this.members = this.$store.getters.users.filter(member => member._id != this.board.createdBy._id);
  }

};
</script>