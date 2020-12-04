<template>
  <section
    v-if="board"
    class="main-board-content"
    :class="{ [board.style.bgc]: board.style.bgc }"
    :style="{ backgroundImage: 'url(' + board.style.url + ')' }"
  >
    <main class="board-container">
      <div class="board-header flex space-between">
        <div class="board-title-container flex justify-center align-center">
          <div class="flex align-center justtify-center">
            <h1
              v-if="!isShowEditTitle"
              @click="openTitleEditor"
              class="board-title clickable"
            >
              {{ board.title }}
            </h1>
            <div
              @click.stop="deleteMemberFromBoard(member)"
              class="flex"
              v-for="member in boardMembers"
              :key="member._id"
            >
              <avatar :fullname="member.fullName" :size="30"></avatar>
            </div>
            <div
              class="board-menu-btn clickable invite-btn"
              @click="toggleMembersList"
            >
              Add Member
            </div>
            <div v-if="showMembersList" class="members-list">
              <members-list :board="board"></members-list>
            </div>
          </div>
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
          @saveBoard="saveBoard"
          :card="cardDetailsToShow"
          :members="board.members"
        >
        </card-details>
      </div>
    </main>
    <transition name="menu-slide">
      <aside v-if="isShowBoardMenu" class="menu-aside">
        <board-menu
          @emmiToggleBoardMenu="toggleBoardMenu"
          :actionType="boardAction"
          @emitChangeMenuAction="changeMenuAction"
        >
          <background-chooser
            @emitChangeMenuAction="changeMenuAction"
            v-if="boardAction === 'Change Background'"
            slot="edit-body"
          />
          <background-color-chooser
            v-if="boardAction === 'Colors'"
            slot="edit-body"
          />
          <!-- <background-photo-chooser
            v-if="boardAction === 'Photos'"
            slot="edit-body"
          /> -->
        </board-menu>
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
import boardMenu from "@/cmps/board-menu.vue";
import backgroundChooser from "@/cmps/background-chooser.vue";
import backgroundColorChooser from "@/cmps/background-color-chooser.vue";
// import backgroundPhotoChooser from "@/cmps/background-photo-chooser.vue";
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
  CHANGE_BGC,
  CLOSE_MEMBERS_LIST,
  SAVE_ORIG_BOARD,
  CHANGE_BGP,
} from "@/services/event-bus.service.js";
import vClickOutside from "v-click-outside";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/services/dnd.service.js";
import socketService from "@/services/socket.service";
import { boardService } from "../services/board.service";
import membersList from "@/cmps/members-list.vue";
import Avatar from "vue-avatar-component";
export default {
  name: "board",
  components: {
    // cardPreview,
    cardDetails,
    list,
    listAdd,
    Container,
    Draggable,
    boardMenu,
    backgroundChooser,
    backgroundColorChooser,
    membersList,
    Avatar,
    // backgroundPhotoChooser,
  },
  computed: {
    board(){
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    boardMembers() {
      return this.board.members;
    },
  },
  data() {
    return {
      showMembersList: false,
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
      boardAction: false,
    };
  },
  methods: {
    deleteMemberFromBoard(member) {
      var idx = this.board.members.findIndex((mem) => mem._id === member._id);
      if (idx != -1) this.board.members.splice(idx, 1);
      //remove from all cards
      this.board.groups.forEach((group) => {
        if (group.cards) {
          group.cards.forEach((card) => {
            if (card.members) {
              var idx = card.members.findIndex(
                (cardMember) => cardMember._id === member._id
              );
              if (idx != -1) card.members.splice(idx, 1);
            }
          });
        }
      });
      this.saveBoard();
    },
    toggleMembersList() {
      this.showMembersList = !this.showMembersList;
    },
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
      const board = Object.assign({},this.board);
      this.$store.dispatch({
        type: "saveBoard",
        board,
      });
      socketService.emit("on newBoard", board);
      this.$forceUpdate();
    },
    saveOriginalBoard(board) {
      console.log(board);
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
      const board = this.board;
      const list = board.groups.find((group) =>
        group.cards.find((currCard) => currCard.id === card.id)
      );
      const idx = list.cards.findIndex((currCard) => currCard.id === card.id);
      if (idx < 0) return;
      list.cards.splice(idx, 1, card)
      this.cardDetailsToShow = Object.assign({},card)
      if (this.$store.getters.getCurrActivityText) {
        var activity = this.createActivity(card);
        this.board.activities.push(activity);
        //reset activity
        this.$store.commit({ type: "setCurrActivityText", activityTxt: "" });
      }
      this.saveBoard();
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
      if (!this.boardTitle) return;
      this.isShowEditTitle = false;
      const board = this.board;
      const newTitle = this.boardTitle;
      board.title = newTitle;
      this.saveBoard();
    },
    toggleBoardMenu() {
      this.boardAction = "";
      this.isShowBoardMenu = !this.isShowBoardMenu;
    },
    socketSaveBoard(board) {
      this.$store.dispatch({
        type: "updateBoard",
        board,
      });
    },
    createActivity(card) {
      var activity = boardService.getEmptyActivity(); //comes with id and createdAt
      activity.byMember = this.$store.getters.loggedinUser;
      activity.txt = this.$store.getters.getCurrActivityText;
      if (card) {
        activity.card.id = card.id;
        activity.card.title = card.title;
      }
      console.log(activity);
      return activity;
    },
    changeMenuAction(actionType) {
      this.boardAction = actionType;
    },
    changeBgc(color) {
      const board = this.board;
      if (board.style.photo) board.style.photo = null;
      board.style.bgc = color;
      this.saveBoard();
    },
    changeBgp(url) {
      const board = this.board;
      if (board.style.bgc) board.style.bgc = null;
      board.style.url = url;
      this.saveBoard();
    },
  },
  created() {
    // this.board = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    eventBus.$on(MOVE_CARD, this.moveCard);
    eventBus.$on(COPY_CARD, this.copyCard);
    eventBus.$on(COPY_LIST, this.copyList);
    eventBus.$on(MOVE_LIST, this.moveList);
    eventBus.$on(CLOSE_DETAILS, this.closeModal);
    eventBus.$on(SAVE_BOARD, this.saveBoard);
    eventBus.$on(SAVE_MEMBERS, this.updateCardInBoard);
    eventBus.$on(DELETE_CARD, this.deleteCard);
    eventBus.$on(SAVE_LIST, this.saveList);
    eventBus.$on(CHANGE_BGC, this.changeBgc);
    eventBus.$on(CLOSE_MEMBERS_LIST, this.toggleMembersList);
    eventBus.$on(SAVE_ORIG_BOARD, this.saveOriginalBoard);
    eventBus.$on(CHANGE_BGP, this.changeBgp);
    this.boardTitle = this.board.title;
    socketService.setup();
    socketService.emit("join board", this.board._id);
    socketService.on("update board", this.socketSaveBoard);
    // console.log('this.$store.getters.currBoard',this.$store.getters.currBoard)
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
  
