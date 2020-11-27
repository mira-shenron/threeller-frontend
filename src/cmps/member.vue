<template>
  <section  @click.stop="toggleMemberToCard">
    <vue-initials-img width="35px" class="avatar" :name="member.fullName" />
    <span>{{ member.fullName }}</span>
    <span v-if="isCardMember">V</span>
  </section>
</template>

<script>
import  {eventBus, SAVE_MEMBERS} from "@/services/event-bus.service.js";

export default {
  props: {
    member: Object,
    card: Object
  },
  data() {
    return {

    };
  },
  computed: {
      isCardMember(){
          if(this.card && this.card.members){
                if(this.card.members.find(member => member._id === this.member._id)) return true;
                else return false;
          }else{
              return false;
          }
      }
  },
  methods: {
      toggleMemberToCard(){
          if(!this.isCardMember) {
              if(!this.card.members){
                  this.card.members = [this.member];
                  eventBus.$emit(SAVE_MEMBERS, this.card);
              }else{
                  this.card.members.push(this.member);
                  eventBus.$emit(SAVE_MEMBERS, this.card);
              }
          }else{
              var idx = this.card.members.findIndex(member => member._id === this.member._id);
              this.card.members.splice(idx,1);
              eventBus.$emit(SAVE_MEMBERS, this.card);
          }
      }
  },
  created(){
     
  }

};
</script>