

<template>
  <section class="home-page">
    <div class="welcome-layout">
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/clear.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple-dark">cool stuff</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
        <el-col :span="10"
          ><img src="../assets/imgs/not-ideal.jpg" class="grid-content" alt=""
        /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/ideal.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
      </el-row>
    </div>
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
      console.log(this.$store.getters.boards);
      return this.$store.getters.boards;
    }
  },
  methods: {
    openBoard(boardId) {
      this.$store.commit({ type: 'setCurrBoard', boardId });
      this.$router.push(`/board/${boardId}`);
    },
    createBoard() {
      var currUser = this.$store.getters.loggedinUser;
      console.log(currUser);
      var emptyBoard = boardService.getEmptyBoard(this.newBoardName, currUser);

      this.$store.dispatch({
        type: "saveBoard",
        board: emptyBoard,
      });
      // console.log(emptyBoard);
    }
  }
};
</script>

