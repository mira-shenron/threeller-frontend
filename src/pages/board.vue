<template>
  <section v-if="board">
    <div>Board name: {{ board.title }}</div>
    <div>
      <input type="text" placeholder=" + Add List" v-model="listName" />
      <button @click="addList">Save</button>
    </div>
    <div class="board flex">
      <div class="list-wrapper" v-for="list in board.groups" :key="list.id">
        <list
          @emitSaveBoard="saveBoard"
          @showCardDetails="showCardDetails"
          :list="list"
        ></list>
      </div>
    </div>
    <div class="popup-details" v-if="isShowDetails">
      <card-details @closeModal="closeModal" :card="cardDetailsToShow">
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
      // console.log("🚀  card:", card);
      this.cardDetailsToShow = card;
      // console.log(ev)
    },
    moveCard({ list, idx, card }) {
      console.log(list, idx, card);
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
      console.log('not');
      const board = this.board;
      const newList = board.groups.find((newList) => newList.id === list.id);
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    closeModal() {
      this.isShowDetails = false;
    },
    saveBoard() {
      const board = this.board;
      console.log("save board");
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
  },
};
</script>
<style lang="scss" scoped >
.popup-details {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(8, 8, 8, 0.5);
  height: 100%;
  width: 100%;
}
</style>


