<template>
  <section class="card">
    <button>e</button>
    <h3>{{ card.title }}</h3>
    <button @click.stop="onEmitDeleteCard">X</button>
  </section>
</template>

<script>
export default {
  name: "card-detail",
  props: {
    card: Object,
  },
  components: {
    // cardDetails
  },
  data() {
    return {};
  },
  methods: {
    onEmitDeleteCard(){
        this.$emit('emitDelete', this.card.id)
    }
  },
  created() {},
};
</script>
<style lang="scss">
.card {
  background-color: rgb(236, 103, 103);
}
</style>