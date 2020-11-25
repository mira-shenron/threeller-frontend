<template>
  <section class="flex column list">
    <div class="name">List name: {{ list.title }}</div>
    <ul v-for="card in list.cards" :key="card.id">
      <li>
        <card-preview
          @click.native="showCardDetails(card)"
          :card="card"
        ></card-preview>
      </li>
    </ul>
    <li>
      <form @submit.prevent="saveCard">
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
    saveCard() {
      const title = this.txt;
      const groupId = this.list.id;
      this.$store.dispatch({
        type: "saveCard",
        card:{
            title
        },
        groupId,
      });
      this.txt = "";
    },
    showCardDetails(card) {
      this.$emit("showCardDetails", card);
    },
  },
  created() {
    console.log(this.list);
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