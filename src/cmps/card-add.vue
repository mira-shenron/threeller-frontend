<template>
  <section class="add-card-cmp">
    <div class="add-card-container">
      <form @submit.prevent="addCard">
        <el-input
          class="list-card-composer-textarea"
          type="textarea"
          autosize
          resize="none"
          placeholder="Enter title for this card..."
          v-model="txt"
        >
        </el-input>
      </form>
    </div>
      <button>Add Card</button>
  </section>
</template>

<script>
export default {
  name: "card-add",
  data() {
    return {
      txt: "",
    };
  },
  methods: {
    addCard() {
      this.$emit("emitAddCard", this.txt);
    },
  },
};
</script>