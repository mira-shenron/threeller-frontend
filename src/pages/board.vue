<template>
  <section v-if="board" class="main-board-content">
    <main class="board-container">
      <div class="board-header flex space-between">
        <div class="board-title-container flex align-center">
          <h1
            v-if="!isShowEditTitle"
            @click="openTitleEditor"
            class="board-title  clickable"
          >
            {{ board.title }}
          </h1>
          <div class=" board-menu-btn clickable invite-btn">Invite</div>
          <div v-show="isShowEditTitle" class="board-input-container">
            <el-input
              ref="boardInput"
              @change="changeBoardTitle"
              @blur="changeBoardTitle"
              v-model="boardTitle"
            ></el-input>
          </div>
        </div>
        <transition name="menu-icn-animation">
          <div
            v-if="!isShowBoardMenu"
            class="board-menu-btn clickable flex"
            @click="toggleBoardMenu"
          >
            <div class="board-menu-icn flex align-center">
              <i class="el-icon-more"></i>
            </div>
            <div class="board-menu-text flex align-center">Show Menu</div>
          </div>
        </transition>
      </div>
      <div class="board flex column">
        <Container
          orientation="horizontal"
          drag-handle-selector=".list-header"
          @drop="onColumnDrop($event)"
          drag-class="column-ghost"
          drop-class="column-ghost-drop"
          :drop-placeholder="upperDropPlaceholderOptions"
        >
          <Draggable v-for="list in board.groups" :key="list.id">
            <list
              @emitSaveBoard="saveBoard"
              @showCardDetails="showCardDetails"
              @emitCardDrop="onCardDrop"
              :list="list"
            ></list>
          </Draggable>
          <list-add @emitAddList="addList" />
        </Container>
      </div>
      <div class="popup-details" v-if="isShowDetails">
        <card-details
          @emitSaveBoard="updateCardInBoard"
          @closeModal="closeModal"
          :card="cardDetailsToShow"
          :members="board.members"
        >
        </card-details>
      </div>
    </main>
    <transition name="menu-slide">
      <aside v-if="isShowBoardMenu" class="board-menu">
        wassap menu
        <span @click="toggleBoardMenu" class="clickable">CloseX</span>
      </aside>
    </transition>
  </section>
</template>

<script>
// import cardPreview from "@/cmps/card-preview.vue";
// @ is an alias to /src
import list from "@/cmps/list.vue";
import listAdd from "@/cmps/list-add.vue";
import cardDetails from "@/cmps/card-details.vue";
import {
  eventBus,
  MOVE_CARD,
  CLOSE_DETAILS,
  COPY_CARD,
  SAVE_BOARD,
  SAVE_MEMBERS,
  COPY_LIST,
  MOVE_LIST,
  DELETE_CARD,
  SAVE_LIST,
} from "@/services/event-bus.service.js";
import vClickOutside from "v-click-outside";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/services/dnd.service.js";
import socketService from "@/services/socket.service";

export default {
  name: "board",
  components: {
    // cardPreview,
    cardDetails,
    list,
    listAdd,
    Container,
    Draggable,
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
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      boardTitle: null,
      isShowEditTitle: false,
      isShowBoardMenu: false,
    };
  },
  methods: {
    addList(list) {
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
        if (info[0] && info[0].blindMode) {
          this.board.colorList = info;
        }
      }
      // this.$store.getters.boards
      const board = JSON.parse(JSON.stringify(this.board));
      this.$store.dispatch({
        type: "saveBoard",
        board,
      });
      socketService.emit("on newBoard", board);
    },
    updatingList(card) {
      const idx = this.list.findIndex((currCard) => currCard.id === card.id);
      if (!idx) return;
      this.list.splice(idx, 1, card);
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
      console.log(list, idx, card);
      const board = this.board;
      const newList = board.groups.find((newList) => newList.id === list.id);
      newList.cards.splice(idx, 0, card);
      this.saveBoard();
    },
    updateCardInBoard(card) {
      console.log("this.board.groups", this.board.groups);
      var groupIdx = -1;
      var cardIdx = -1;
      for (let i = 0; i < this.board.groups.length; i++) {
<<<<<<< HEAD
        // if (!this.board.groups[i].cards.length) continue;
=======
>>>>>>> aviv
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
      console.log(this.board);
    },
    deleteCard(card) {
      console.log("here");
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
      console.log("second phase count");
      this.saveBoard();
    },
    moveList({ newIdx, listId }) {
      const board = this.board;
      const oldIdx = board.groups.findIndex((list) => list.id === listId);
      if (oldIdx < 0) return;
      board.groups.splice(newIdx, 0, board.groups.splice(oldIdx, 1)[0]);
      this.saveBoard();
    },
    onColumnDrop(dropResult) {
      const board = Object.assign({}, this.board);
      this.board.groups = applyDrag(board.groups, dropResult);
      this.saveBoard();
    },
    onCardDrop({ listId, dropResult }) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const list = board.groups.filter((l) => l.id === listId)[0];
        const listIndex = board.groups.indexOf(list);
        const newList = Object.assign({}, list);
        newList.cards = applyDrag(newList.cards, dropResult);
        board.groups.splice(listIndex, 1, newList);
        this.saveBoard();
      }
    },
    saveList(newList) {
      const idx = this.board.groups.findIndex((list) => list.id === newList.id);
      this.board.groups.splice(idx, 1, newList);
      this.saveBoard();
    },
    openTitleEditor() {
      this.isShowEditTitle = true;
      this.$nextTick(() => this.$refs.boardInput.focus());
    },
    changeBoardTitle() {
      this.isShowEditTitle = false;
      const board = this.board;
      const newTitle = this.boardTitle;
      board.title = newTitle;
      this.saveBoard();
    },
    toggleBoardMenu() {
      this.isShowBoardMenu = !this.isShowBoardMenu;
    },
    socketSaveBoard(board) {
      this.$store.dispatch({
        type: "updateBoard",
        board
      });
    },
  },
  created() {
    eventBus.$on(MOVE_CARD, this.moveCard);
    eventBus.$on(COPY_CARD, this.copyCard);
    eventBus.$on(COPY_LIST, this.copyList);
    eventBus.$on(MOVE_LIST, this.moveList);
    eventBus.$on(CLOSE_DETAILS, this.closeModal);
    eventBus.$on(SAVE_BOARD, this.saveBoard);
    eventBus.$on(SAVE_MEMBERS, this.updateCardInBoard);
    eventBus.$on(DELETE_CARD, this.deleteCard);
    eventBus.$on(SAVE_LIST, this.saveList);
    this.boardTitle = this.board.title;
    socketService.setup();
    socketService.emit("join board", this.board._id);
    socketService.on("update board", this.socketSaveBoard);
  },
  destroyed() {
    socketService.off("update board", this.socketSaveBoard);
    socketService.terminate();
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
  



