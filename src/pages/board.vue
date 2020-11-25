<template>
  <section>
    <div>Board name: {{ board.title }}</div>
    <div>
      <input type="text" placeholder=" + Add List" v-model="listName" />
      <button @click="addList">Save</button>
    </div>
    <div v-for="list in board.groups" :key="list.id">
      <list @showCardDetails="showCardDetails" :list="list"></list>
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

export default {
  name: "board",
  components: {
    // cardPreview,
    cardDetails,
    list,
  },

  data() {
    return {
      board: null,
      isShowDetails: false,
      cardDetailsToShow: null,
      listName: ''
    };
  },
  methods: {
    addList() {
      console.log(this.listName)
      console.log(this.board._id)
      this.$store.dispatch({
        type: 'addList',
        boardId: this.board._id,
        listName: this.listName
      })
    },
    showCardDetails(card) {
      console.log(" board  ~ card", card);
      this.isShowDetails = true;
      // console.log("🚀  card:", card);
      this.cardDetailsToShow = card;
      // console.log(ev)
    },
    closeModal() {
      console.log('V')
      this.isShowDetails = false;
    },
  },
  created() {
    this.board = this.$store.getters.boards[0];
  }
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


