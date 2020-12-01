

<template>
  <section class="home-page">
    <div>
      <h2 class="boards">Boards</h2>
      <input v-model="newBoardName" placeholder="Enter name" />
      <button @click="createBoard">Create new board</button>
      <div v-for="board in boards" :key="board._id">
        <board-preview
          class="flex align-center justify-center"
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
    boardPreview
  },
  data() {
    return {
      newBoardName: ''
    }
  },
  computed: {
    boards() {
      var currUser = this.$store.getters.loggedinUser;
      return this.$store.getters.boards.filter(board => board.createdBy._id === currUser._id
        || this.checkIfMember(board.members, currUser));
    }
  },
  methods: {
    checkIfMember(boardMembers, currUser) {
      boardMembers.forEach(member => {
        if (member._id === currUser._id) return true;
      })
      return false;
    },
    openBoard(boardId) {
      this.$store.commit({ type: 'setCurrBoard', boardId });
      this.$router.push(`board/${boardId}`);
    },
    createBoard() {
      var currUser = this.$store.getters.loggedinUser;
      console.log('user:', currUser);
      var emptyBoard = boardService.getEmptyBoard(this.newBoardName, currUser);

      this.$store.dispatch({
        type: "addBoard",
        board: emptyBoard,
      });

      var currBoardId = this.$store.getters.currBoard._id;
      this.openBoard(currBoardId);
    }
  }
};
</script>

