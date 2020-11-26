<template>
  <div v-if="lists">
    <form @submit.prevent="copyCard">
      <select name="lists" id="lists" v-model="currList">
        <option v-for="list in lists" :value="list" :key="list.id">
          {{ list.title }}
        </option>
      </select>
      <select
        v-if="currList && currList.cards.length > 0"
        name="cards"
        id="cards"
        v-model="selectedCardIdx"
      >
        <option
          v-for="(card, idx) in currList.cards"
          :value="idx"
          :key="card.id"
        >
          {{ idx + 1 }} <span v-if="card.id === currCard.id">(current)</span>
        </option>
        <option :value="currList.cards.length">
          {{ currList.cards.length + 1 }}
        </option>
      </select>
      <select
        v-if="currList && currList.cards.length === 0"
        name="cards"
        id="cards"
        v-model="selectedCardIdx"
      >
        <option :value="0">1</option>
      </select>
      <button>Create Card</button>
    </form>
  </div>
</template>
<script>
import {
  eventBus,
  COPY_CARD,
  CLOSE_DETAILS,
} from "@/services/event-bus.service.js";
import utilService from "../services/util.service";

export default {
  props: {
    currCard: {
      type: Object,
    },
  },
  data() {
    return {
      currList: null,
      selectedCardIdx: null,
    };
  },
  computed: {
    lists() {
      return JSON.parse(JSON.stringify(this.$store.getters.getLists));
    },
  },
  methods: {
    copyCard() {
      if (this.selectedCardIdx < 0 || this.selectedCardIdx === null) return;
      const card = JSON.parse(JSON.stringify(this.currCard));
      card.id = utilService.makeId();
      console.log(card.id);
      eventBus.$emit(COPY_CARD, {
        list: this.currList,
        idx: this.selectedCardIdx,
        card,
      });
      this.currList = null;
      this.selectedCardIdx = null;
      eventBus.$emit(CLOSE_DETAILS);
    },
  },
};
</script>