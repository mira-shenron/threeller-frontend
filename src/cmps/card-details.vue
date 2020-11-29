<template>
  <div class="card-detail-main">
    <div
      v-show="bgColorOfCard"
      class="cover-card"
      :class="{ [bgColorOfCard]: bgColorOfCard }"
    ></div>
    <div class="card-details">
      <div class="header-card flex space-between">
        <div class="flex align-center">
          <img width="45px" src="../assets/card-icons/card.png" alt="" />
          <span class="card-title">{{ card.title }}</span>
        </div>
        <span class="clickable" @click="isShowDetails"
          ><i class="el-icon-close"></i
        ></span>
      </div>
      <div class="main-card flex space-between">
        <div class="main-content">
          <div class="flex">
            <div v-if="card.members">
              <card-details-members
                :members="card.members"
              ></card-details-members>
            </div>
            <div>Labels</div>
            <div>DueDate</div>
          </div>
          <div class="card-descrp">
            <div class="flex align-center">
              <img
                width="40px"
                src="../assets/card-icons/description.png"
                alt=""
              />
              <div class="second-header">Description</div>
            </div>
            <div
              v-if="showDesc"
              class="description clickable"
              @click.stop="openShowDesc"
            >
              {{ descriptionOnDiv }}
            </div>
            <div v-else>
              <textarea
                rows="10"
                cols="80"
                v-model="descriptionOnText"
                placeholder="Add new description"
              ></textarea>
              <div>
                <el-button size="small" type="success" @click="saveDescription">Save</el-button>
                <span class="clickable" @click.stop="closeDescriptionEdit"
                  ><i class="el-icon-close"></i
                ></span>
              </div>
            </div>
          </div>
          <div v-if="card.checklists">
            <card-details-checklist
              :card="card"
            ></card-details-checklist>
          </div>
          <div>
            <div class="card-activities">
              <div class="flex align-center">
                <img
                  width="40px"
                  src="../assets/card-icons/activities.png"
                  alt=""
                />
                <div class="second-header">Activity</div>
              </div>
              <div class="activities-list">
                <div class="flex align-center">
                  <avatar :fullname="currUser" :size="40"></avatar>
                  <input
                    class="comment-input"
                    placeholder="Write a comment..."
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
        <div class="nav">
          <span class="action-type">Suggested</span>
          <div class="flex align-center card-action clickable">
            <img src="../assets/action-icons/members.png" alt="" />
            <div class="action-name" @click="edit('join')">Join</div>
          </div>
          <span class="action-type">Add to card</span>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('members')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/members.png" alt="" />
              <div class="action-name">Members</div>
            </div>
            <edit-container :feature="'Members'" v-if="currEdit === 'members'">
              <card-members slot="edit-body" :card="card" :members="members" />
            </edit-container>
          </div>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('labels')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/label.png" alt="" />
              <div class="action-name">Labels</div>
            </div>
            <edit-container v-if="currEdit === 'labels'" :feature="'Labels'">
              <card-labels
                :chooseColor="chooseColor"
                @updatingCard="updatingCard"
                :card="card"
                slot="edit-body"
                @openColorModale="openColorModale"
                @updatListOfColors="updatListOfColors"
              />
            </edit-container>
            <edit-container
              v-if="currEdit === 'colorPicker'"
              :feature="'Created label'"
            >
              <color-picker
                :card="card"
                v-model="chooseColor"
                slot="edit-body"
                @openLabelsModal="openLabels"
              />
            </edit-container>
          </div>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('checklist')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/checkmarks.png" alt="" />
              <div class="action-name">Checklist</div>
            </div>
            <edit-container
              :feature="'Checklist'"
              v-if="currEdit === 'checklist'"
            >
              <checklist slot="edit-body" :card="card"> </checklist>
            </edit-container>
          </div>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('dueDate')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/dueDate.png" alt="" />
              <div class="action-name">Due Date</div>
            </div>
            <edit-container
              :feature="'Change Due Date'"
              v-if="currEdit === 'dueDate'"
            >
              <due-date slot="edit-body" :card="card" />
            </edit-container>
          </div>
          <div class="flex align-center card-action clickable">
            <img src="../assets/action-icons/attachment.png" alt="" />
            <div class="action-name" @click="edit('attachment')">
              Attachment
            </div>
          </div>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('cover')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/covers.png" alt="" />
              <div class="action-name">Cover</div>
            </div>
            <edit-container :feature="'Cover'" v-if="currEdit === 'cover'">
              <card-cover
                @updatingCard="updatingCard"
                slot="edit-body"
                :card="card"
                @changeBgColor="changeBgColor"
              ></card-cover>
            </edit-container>
          </div>
          <span class="action-type">Actions</span>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('move')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/move.png" alt="" />
              <div class="action-name">Move</div>
            </div>
            <edit-container :feature="'Move Card'" v-if="currEdit === 'move'">
              <card-move slot="edit-body" :currCard="card" />
            </edit-container>
          </div>
          <div
            class="flex relative align-center card-action clickable"
            @click="edit('copy')"
          >
            <div class="flex align-center">
              <img src="../assets/action-icons/copy.png" alt="" />
              <div class="action-name">Copy</div>
            </div>
            <edit-container :feature="'Copy Card'" v-if="currEdit === 'copy'">
              <card-copy slot="edit-body" :currCard="card" />
            </edit-container>
          </div>
          <div class="flex align-center card-action clickable">
            <img src="../assets/action-icons/trash.png" alt="" />
            <div class="action-name" @click="onDeleteCard">Delete</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT, DELETE_CARD } from "@/services/event-bus.service.js";
import editContainer from "./edit-container.vue";
import cardMove from "./card-move.vue";
import cardCopy from "./card-copy.vue";
import dueDate from "./due-date.vue";
import activityDetails from "./activity-details.vue";
import cardMembers from "./card-members.vue";
import colorPicker from "./color-picker.vue";
import cardLabels from "./card-labels.vue";
import cardCover from "./card-cover.vue";
import checklist from "./checklist.vue";
import cardDetailsChecklist from "./card-details-checklist.vue";
import Avatar from 'vue-avatar-component';
import cardDetailsMembers from './card-details-members.vue';


export default {
  name: "card-details",
  props: {
    card: Object,
    members: Array,
  },
  data() {
    return {
      currEdit: null,
      descriptionOnDiv: "",
      descriptionOnText: "",
      activities: [],
      currUser: "Abi Abambi", //temp,
      showDesc: true,
      chooseColor: {},
      closeEditor: null,
      bgColorOfCard: null,
      bgcCoverType: null,
    };
  },
  methods: {
    isShowDetails() {
      this.$emit("closeModal");
    },
    onDeleteCard() {
      eventBus.$emit(DELETE_CARD, this.card)
    },
    edit(feature) {
      this.currEdit = feature;
    },
    updatingCard(card) {
      this.card = card;
      this.$emit("emitSaveBoard");
    },
    openColorModale() {
      this.edit("colorPicker");
    },
    openLabels() {
      this.edit("labels");
    },
    updatListOfColors(list) {
      this.$emit("emitSaveBoard", list);
    },
    openShowDesc() {
      this.showDesc = !this.showDesc;
      this.descriptionOnText = this.card.description
        ? this.card.description
        : "";
    },
    closeDescriptionEdit() {
      this.descriptionOnDiv = this.card.description
        ? this.card.description
        : "Add something here";
      this.descriptionOnText = this.card.description
        ? this.card.description
        : "";
      this.showDesc = !this.showDesc;
    },
    saveDescription() {
      this.card.description = this.descriptionOnText;
      this.descriptionOnDiv = this.descriptionOnText;
      this.$emit("emitSaveBoard");
      this.showDesc = !this.showDesc;
    },
    changeBgColor(cover) {
      if (!cover) return;
      this.bgColorOfCard = cover.color;
      console.log("🚀 ~ file: card-details.vue ~ line 299 ~ changeBgColor ~ this.bgColorOfCard", this.bgColorOfCard)
    },
  },
  components: {
    colorPicker,
    cardLabels,
    cardMove,
    cardCopy,
    editContainer,
    dueDate,
    activityDetails,
    cardMembers,
    cardCover,
    checklist,
    cardDetailsChecklist,
    Avatar,
    cardDetailsMembers
  },
  computed: {
    acts() {
      var board = JSON.parse(
        JSON.stringify(this.$store.getters.currBoard)
      );
      var res = board.activities.filter(
        (actv) => actv.card.id === this.card.id
      );
      return res;
    },
    membersToShow() {
      return "placeholder";
    },
  },
  created() {
    eventBus.$on(CLOSE_EDIT, () => {
      this.currEdit = null;
    });

    this.descriptionOnDiv = this.card.description
      ? this.card.description
      : "Add something here";
  },
};
</script>

