<template>
  <section class="card-composer">
    <div class="add-card-container">
      <form @submit.prevent="addCard">
        <el-input
          ref="textarea"
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
    <div class="card-controls flex">
      <el-button type="success" @click="addCard">Add Card</el-button>
      <div class="cancel-btn flex align-center clickable" @click="closeAddCard">
        <i class="el-icon-close"></i>
      </div>
    </div>
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
    closeAddCard() {
      this.$emit("emitCloseAddCard");
    },
  },
  mounted() {
    this.$refs.textarea.focus();
  },
};
</script>