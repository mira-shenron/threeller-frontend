<template>
  <section class="flex column list">
    <div class="list-header">{{ list.title }}</div>
    <div class="card-container flex column">
      <div v-for="card in list.cards" :key="card.id">
        <card-preview 
          @click.native="showCardDetails(card)"
          @emitDelete="deleteCard"
          :card="card"
        ></card-preview>
      </div>
    </div>
    <div class="add-card-container">
      <form @submit.prevent="addCard">
        <el-input class="list-card-composer-textarea"
          type="textarea"
          autosize
          resize="none"
          placeholder="Enter title for this card..."
          v-model="txt">
        </el-input>
        <button>save</button>
      </form>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import cardPreview from "@/cmps/card-preview.vue";
import utilService from "@/services/util.service.js";

export default {
  props: ["list"],
  components: {
    cardPreview,
  },
  data() {
    return {
      txt: "",
    };
  },
  methods: {
    addCard() {
      const title = this.txt;
      const card = {
        title,
        id: utilService.makeId(),
        createdAt: Date.now(),
      };
      this.list.cards.push(card);
      this.txt = "";
      this.$emit("emitSaveBoard");
    },
    deleteCard(cardId) {
      const idx = this.list.cards.findIndex((card) => card.id === cardId);
      this.list.cards.splice(idx, 1);
      this.$emit("emitSaveBoard");
    },
    showCardDetails(card) {
      this.$emit("showCardDetails", card);
    },
    // updatingCard(card){
    // console.log("in list card:", card)
      
    // }
  },
  created() {},
};
</script>
