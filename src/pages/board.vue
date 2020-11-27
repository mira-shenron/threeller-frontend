<template>
  <section v-if="board">
    <div>Board name: {{ board.title }}</div>
    <div class="board flex">
      <div class="list-wrapper" v-for="list in board.groups" :key="list.id">
        <list
          @emitSaveBoard="saveBoard"
          @showCardDetails="showCardDetails"
          :list="list"
        ></list>
      </div>
      <div class="add-list-container">
        <div class="list-placeholder-container">
          <span class="list-placeholder flex align-center">
            <div class="svg-container flex align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path class="plus" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            </div>
          <div class="add-list-text">Add another list</div>
          </span>
        </div>
        <div class="add-list">
          <el-input type="text" placeholder=" + Add List" v-model="listName" />
          <button @click="addList">Add List</button>
        </div>
      </div>
    </div>
    <div class="popup-details" v-if="isShowDetails">
      <card-details
        @emitSaveBoard="saveBoard"
        @closeModal="closeModal"
        :card="cardDetailsToShow"
      >
      </card-details>
    </div>
  </section>
</template>

<script>
// import cardPreview from "@/cmps/card-preview.vue";
// @ is an alias to /src
import list from "@/cmps/list.vue";
import cardDetails from "@/cmps/card-details.vue";
import { boardService } from "../services/board.service.js";
import {
  eventBus,
  MOVE_CARD,
  CLOSE_DETAILS,
  COPY_CARD,
  SAVE_BOARD,
} from "@/services/event-bus.service.js";

export default {
  name: "board",
  components: {
    // cardPreview,
    cardDetails,
    list,
  },
  computed: {
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
  },
  data() {
    return {
      isShowDetails: false,
      cardDetailsToShow: null,
      listName: "",
    };
  },
  methods: {
    addList() {
      var list = boardService.getEmptyList(this.listName);
      this.board.groups.push(list);
      this.saveBoard();
    },
    showCardDetails(card) {
      console.log(" board  ~ card", card);
      this.isShowDetails = true;
      this.cardDetailsToShow = card;
    },
    moveCard({ list, idx, card }) {
      const board = this.board;
      const oldList = board.groups.find((newList) =>
        newList.cards.find((currCard) => currCard.id === card.id)
      );
      const newList = board.groups.find((newList) => newList.id === list.id);
      const oldIdx = oldList.cards.findIndex(
        (oldCard) => oldCard.id === card.id
      );
      oldList.cards.splice(oldIdx, 1);
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    copyCard({ list, idx, card }) {
      const board = this.board;
      const newList = board.groups.find((newList) => newList.id === list.id);
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    closeModal() {
      this.isShowDetails = false;
    },
    saveBoard() {
      const board = JSON.parse(JSON.stringify(this.board));
      this.$store.dispatch({
        type: "saveBoard",
        board,
      });
    },
  },
  created() {
    eventBus.$on(MOVE_CARD, this.moveCard);
    eventBus.$on(COPY_CARD, this.copyCard);
    eventBus.$on(CLOSE_DETAILS, this.closeModal);
    eventBus.$on(SAVE_BOARD, this.saveBoard);
  },
};
</script>


