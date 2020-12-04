

<template>
  <section class="home-page">
    <div>
      <header class="home-header">
        <h2 class="header-text">Boards</h2>
      </header>
      <div class="add-board-container">
        <transition name="board-composer-animation">
          <div
            v-if="!isShowAddBoard"
            @click="toggleAddBoardComposer"
            class="add-board-placeholder clickable"
          >
            Add Board
          </div>
        </transition>
        <transition name="board-composer-animation">
          <div v-if="isShowAddBoard" class="board-composer">
            <el-input
              ref="boardAddInput"
              @change="createBoard"
              v-model="newBoardName"
              placeholder="Enter name"
            />
            <div class="board-controls flex justify-center align-center">
              <el-button @click="createBoard">Create New Board</el-button>
              <el-button
                @click="toggleAddBoardComposer"
                type="danger"
                icon="el-icon-close"
                circle
              ></el-button>
            </div>
          </div>
        </transition>
      </div>
      <div class="board-preview-grid">
        <board-preview
          v-for="board in boards"
          :key="board._id"
          @click.native="openBoard(board._id)"
          :board="board"
        ></board-preview>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import boardPreview from "@/cmps/board-preview.vue";
import { boardService } from "../services/board.service.js";

export default {
  name: "home-page",
  components: {
    boardPreview,
  },
  data() {
    return {
      newBoardName: "",
      isShowAddBoard: false,
    };
  },
  computed: {
    boards() {
      var currUser = this.$store.getters.loggedinUser;
      return this.$store.getters.boards.filter(
        (board) =>
          board.createdBy._id === currUser._id ||
          this.checkIfMember(board.members, currUser)
      );
    },
  },
  methods: {
    checkIfMember(boardMembers, currUser) {
      boardMembers.forEach((member) => {
        if (member._id === currUser._id) return true;
      });
      return false;
    },
    openBoard(boardId) {
      this.$store.commit({ type: "setCurrBoard", boardId });
      this.$router.push(`board/${boardId}`);
    },
    async createBoard() {
      if (!this.newBoardName) return;
      var currUser = this.$store.getters.loggedinUser;
      console.log("user:", currUser);
      var emptyBoard = boardService.getEmptyBoard(this.newBoardName, currUser);
      this.isShowAddBoard = false;
      const currBoardId = await this.$store.dispatch({
        type: "addBoard",
        board: emptyBoard,
      });

      this.openBoard(currBoardId);
    },
    toggleAddBoardComposer() {
      this.isShowAddBoard = !this.isShowAddBoard;
      if (this.isShowAddBoard)
        this.$nextTick(() => {
          this.$refs.boardAddInput.focus();
        });
    },
  },
};
</script>

