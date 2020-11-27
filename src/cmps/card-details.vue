<template>
  <div class="card-details">
    <div class="header-card flex space-between">
      <div class="flex align-center">
        <img width="45px" src="../assets/card-icons/card.png" alt="" />
        <span class="card-title">{{ card.title }}</span>
      </div>
      <span class="clickable" @click="isShowDetails">X</span>
    </div>
    <div class="main-card flex space-between">
      <div class="main-content">
        <div class="card-descrp">
          <div class="flex align-center">
            <img width="40px" src="../assets/card-icons/description.png" alt=""/>
            <div>Description</div>
          </div>
          <div v-if="showDesc" class="description clickable" @click.stop="openShowDesc">
            {{ descriptionOnDiv }}
          </div>
          <div v-else>
            <textarea rows="10" cols="80" v-model="descriptionOnText" placeholder="Add new description"></textarea>
            <div>
              <button class="clickable" @click="saveDescription">Save</button>
              <span class="clickable" @click.stop="closeDescriptionEdit">X</span>
            </div>
          </div>
        </div>
        <div>
          <div class="card-activities">
            <div class="flex align-center">
              <img
                width="40px"
                src="../assets/card-icons/activities.png"
                alt=""
              />
              <div>Activity</div>
            </div>
            <div class="activities-list">
              <div class="flex align-center">
                <vue-initials-img class="avatar" :name="currUser" />
                <input
                  class="comment-input"
                  placeholder="Write a comment"
                  type="text"
                />
              </div>

              <div v-for="activity in acts" :key="activity.id">
                <activity-details :activity="activity"></activity-details>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav clickable">
        <a @click="edit('join')">Join</a>
        <a @click="edit('members')">Members</a>
        <a @click="edit('labels')">Labels</a>
        <a @click="edit('checklist')">Checklist</a>
        <a @click="edit('due Date')">Due Date</a>
        <a @click="edit('attachment')">Attachment</a>
        <div class="relative" @click="edit('cover')">
          <a>Cover</a>
          <edit-container :feature="'Cover-Card'" v-if="currEdit === 'cover'">
            <input type="text" slot="edit-body" />
          </edit-container>
        </div>
        <div class="relative" @click="edit('move')">
          <a>Move</a>
          <edit-container :feature="'Move-Card'" v-if="currEdit === 'move'">
            <card-move slot="edit-body" />
          </edit-container>
        </div>
        <a @click="edit('copy')">Copy</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";
import editContainer from "./edit-container.vue";
import cardMove from "./card-move.vue";
import activityDetails from "./activity-details.vue";

export default {
  name: "card-details",
  props: {
    card: Object,
  },
  data() {
    return {
      currEdit: null,
      descriptionOnDiv: '',
      descriptionOnText:'',
      activities: [],
      currUser: "Abi Abambi", //temp,
      showDesc: true
    };
  },
  methods: {
    openShowDesc() {
      this.showDesc = !this.showDesc;
      this.descriptionOnText = this.card.description ? (this.card.description) : '';
    },
    closeDescriptionEdit(){
      this.descriptionOnDiv = this.card.description ? (this.card.description) : 'Add something here';
      this.descriptionOnText = this.card.description ? (this.card.description) : '';
      this.showDesc = !this.showDesc;
    },
    isShowDetails() {
      this.$emit("closeModal");
    },
    edit(feature) {
      this.currEdit = feature;
    },
    saveDescription() {
      this.card.description = this.descriptionOnText;
      this.descriptionOnDiv = this.descriptionOnText;
      this.$emit("emitSaveBoard");
      this.showDesc = !this.showDesc;
    }
  },
  components: {
    cardMove,
    editContainer,
    activityDetails
  },
  computed: {
    acts() {
      var board = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
      var res = board.activities.filter(actv => actv.card.id === this.card.id);
      return res;
    }
  },
  created() {
    eventBus.$on(CLOSE_EDIT, () => {
      this.currEdit = null;
      console.log(this.currEdit);
    });

    this.descriptionOnDiv = this.card.description ? (this.card.description) : 'Add something here';
  },
}

</script>

