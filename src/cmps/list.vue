<template>
  <section class="flex column list">
    <div class="name">List name: {{ list.title }}</div>
    <ul v-for="card in list.cards" :key="card.id">
      <li>
        <card-preview
          @click.native="showCardDetails(card)"
          @emitDelete="deleteCard"
          :card="card"
        ></card-preview>
      </li>
    </ul>
    <li>
      <form @submit.prevent="addCard">
        <input type="text" v-model="txt" placeholder="title of the card" />
        <!-- <input
                    type="text"
                    v-model="newCard.id"
                    placeholder="id of the card"
                /> -->
        <button>save</button>
      </form>
    </li>
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
  },
  created() {
    
  },
};
</script>
<style lang="scss" scoped>
.list {
  width: 300px;
  border: 1px solid black;
}

.name {
  font-weight: bold;
}
</style>