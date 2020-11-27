<template>
  <div class="card-details">
    <div class="header-card flex space-between">
      <div>
        <button>🎫</button>
        <span>{{ card.title }}</span>
      </div>
      <button @click="isShowDetails">X</button>
    </div>
    <div class="main-card flex space-between">
      <div class="main-contsnt">
        <div>Descrition{{ card.description }}</div>
        <div>Activity</div>
      </div>
      <div class="nav clickable">
        <a @click="edit('join')">Join</a>
        <a @click="edit('members')">Members</a>
        <a @click="edit('labels')">Labels</a>
        <a @click="edit('checklist')">Checklist</a>
        <div class="relative" @click="edit('dueDate')">
          <a>Due Date</a>
          <edit-container :feature="'Change Due Date'" v-if="currEdit === 'dueDate'">
            <due-date slot="edit-body" :card="card" />
          </edit-container>
        </div>
        <a @click="edit('attachment')">Attachment</a>
        <div class="relative" @click="edit('cover')">
          <a>Cover</a>
          <edit-container :feature="'Cover-Card'" v-if="currEdit === 'cover'">
            <!-- <input type="text" slot="edit-body" /> -->
          </edit-container>
        </div>
        <div class="relative" @click="edit('move')">
          <a>Move</a>
          <edit-container :feature="'Move-Card'" v-if="currEdit === 'move'">
            <card-move slot="edit-body" :currCard="card" />
          </edit-container>
        </div>
        <div class="relative" @click="edit('copy')">
          <a>Copy</a>
          <edit-container :feature="'Copy-Card'" v-if="currEdit === 'copy'">
            <card-copy slot="edit-body" :currCard="card" />
          </edit-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";
import editContainer from "./edit-container.vue";
import cardMove from "./card-move.vue";
import cardCopy from "./card-copy.vue";
import dueDate from "./due-date.vue";

export default {
  name: "card-details",
  props: {
    card: Object,
  },
  data() {
    return {
      currEdit: null,
    };
  },
  methods: {
    isShowDetails() {
      this.$emit("closeModal");
    },
    edit(feature) {
      this.currEdit = feature;
    },
  },
  components: {
    cardMove,
    cardCopy,
    editContainer,
    dueDate
  },
  created() {
    eventBus.$on(CLOSE_EDIT, () => {
      console.log("close!");
      this.currEdit = null;
      console.log(this.currEdit);
    });
  },
};
</script>

