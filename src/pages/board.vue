<template>
  <section v-if="board">
    <div>Board: {{ board.title }}</div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  class="plus"
                  d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                />
              </svg>
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
        :members="board.members"
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
  SAVE_MEMBERS,
  COPY_LIST,
  DELETE_CARD
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
            this.isShowDetails = true;
            this.cardDetailsToShow = card;
        },
        closeModal() {
            this.isShowDetails = false;
        },
        saveBoard(info) {
            if (info) {
                if(info[0] ||info[0].blindMode){
                    this.board.colorList = info;
                }
            }
            const board = JSON.parse(JSON.stringify(this.board));
            console.log("save board:", board);
            this.$store.dispatch({
                type: "saveBoard",
                board,
            });
        },

    updatingList(card) {
      const idx = this.list.findIndex(
        (currCard) => currCard.id === card.id
      );
      if (!idx) return;
      this.list.splice(idx, 1, card);
    },
    moveCard({ list, idx, card }) {
      const board = this.board;
      const oldList = board.groups.find((newList) =>
        newList.cards.find((currCard) => currCard.id === card.id)
      );
      const newList = board.groups.find(
        (newList) => newList.id === list.id
      );
      const oldIdx = oldList.cards.findIndex(
        (oldCard) => oldCard.id === card.id
      );
      oldList.cards.splice(oldIdx, 1);
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    copyCard({ list, idx, card }) {
      const board = this.board;
      const newList = board.groups.find(
        (newList) => newList.id === list.id
      );
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    saveMembers(card) {
      var groupIdx = -1;
      var cardIdx = -1;
      for (let i = 0; i < this.board.groups.length; i++) {
        for (let j = 0; j < this.board.groups[i].cards.length; j++) {
          if (this.board.groups[i].cards[j].id === card.id) {
            groupIdx = i;
            cardIdx = j;
            break;
          }
        }
      }
      this.board.groups[groupIdx].cards.splice(cardIdx, 1, card);
      this.saveBoard();
    },
    deleteCard(card) {
      console.log('here')
      var groupIdx = -1;
      var cardIdx = -1;
      for (let i = 0; i < this.board.groups.length; i++) {
        for (let j = 0; j < this.board.groups[i].cards.length; j++) {
          if (this.board.groups[i].cards[j].id === card.id) {
            groupIdx = i;
            cardIdx = j;
            break;
          }
        }
      }
      this.closeModal();
      this.board.groups[groupIdx].cards.splice(cardIdx, 1);
      this.saveBoard();
    },
    copyList({ list, currId }) {
      const board = this.board;
      const listIdx = board.groups.findIndex((list) => list.id === currId);
      if (listIdx < 0) return;
      board.groups.splice(listIdx + 1, 0, list);
      this.saveBoard();
    }
  },
  created() {
    eventBus.$on(MOVE_CARD, this.moveCard);
    eventBus.$on(COPY_CARD, this.copyCard);
    eventBus.$on(CLOSE_DETAILS, this.closeModal);
    eventBus.$on(SAVE_BOARD, this.saveBoard);
    eventBus.$on(SAVE_MEMBERS, this.saveMembers);
    eventBus.$on(DELETE_CARD, this.deleteCard);
    eventBus.$on(COPY_LIST, this.copyList);
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
  



