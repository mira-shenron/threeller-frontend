<template>
  <section class="flex column list">
    <div class="name">{{ list.title }}</div>
    <div class="card-container flex column">
      <div v-for="card in list.cards" :key="card.id">
        <card-preview 
          @click.native="showCardDetails(card)"
          @emitDelete="deleteCard"
          :card="card"
        ></card-preview>
      </div>
    </div>
    <div>
      <form @submit.prevent="addCard">
        <input type="text" v-model="txt" placeholder="title of the card" />
        <!-- <input
                    type="text"
                    v-model="newCard.id"
                    placeholder="id of the card"
                /> -->
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
  created() {
    
  },
};
</script>