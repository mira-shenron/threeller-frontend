<template>
  <section @click.stop="toggleMemberToCard">
    <div class="members-list flex space-between align-center">
      <div class="flex align-center">
        <div class="custom-avatar">
          <avatar :src="imgUrl" :fullname="member.fullName" :size="32"></avatar>
        </div>
        <span class="member-name">{{ member.fullName }}</span>
      </div>
      <span v-if="isCardMember"><i class="el-icon-check"></i></span>
    </div>
  </section>
</template>

<script>
import { eventBus, SAVE_MEMBERS } from "@/services/event-bus.service.js";
import Avatar from 'vue-avatar-component';

export default {
  props: {
    member: Object,
    card: Object
  },
  components: {
    Avatar
  },
  data() {
    return {

    };
  },
  computed: {
    isCardMember() {
      if (this.card && this.card.members) {
        if (this.card.members.find(member => member._id === this.member._id)) return true;
        else return false;
      } else {
        return false;
      }
    },
    imgUrl(){
      return this.$store.getters.loggedInUser.imgUrl
    }
  },
  methods: {
    addActivity(txt) {
      this.$store.commit(
        { type: 'setCurrActivityText', activityTxt: txt }
      )
    },
    toggleMemberToCard() {
      if (!this.isCardMember) {
        if (!this.card.members) {
          this.card.members = [this.member];
          this.addActivity(`added member ${this.member.fullName}`);
          eventBus.$emit(SAVE_MEMBERS, this.card);
        } else {
          this.card.members.push(this.member);
          this.addActivity(`added member ${this.member.fullName}`);
          eventBus.$emit(SAVE_MEMBERS, this.card);
        }
      } else {
        var idx = this.card.members.findIndex(member => member._id === this.member._id);
        var removedCards = this.card.members.splice(idx, 1);
        this.addActivity(`removed member ${removedCards[0].fullName}`);
        eventBus.$emit(SAVE_MEMBERS, this.card);
      }
    }
  },
  created() {

  }

};
</script>