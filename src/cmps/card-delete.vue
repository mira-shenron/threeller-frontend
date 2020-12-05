<template>
  <section class="card-delete">
    <div>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the card. There is no undo.
    </div>
    <el-button @click.stop="onDeleteCard" type="danger">Delete</el-button>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    addActivity(txt) {
      this.$store.commit({ type: "setCurrActivityText", activityTxt: txt });
    },
    onDeleteCard() {
      this.addActivity(`Deleted card`);
      this.$emit("onDeleteCard");
      
    },
  },
  created() {},
};
</script>