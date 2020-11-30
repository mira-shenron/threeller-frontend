<template>
  <div class="flex column">
    <div v-for="checklist in card.checklists" :key="checklist.id">
        <checklist-todos :checklist="checklist" :card="card"></checklist-todos>
    </div>
  </div>
</template>

<script>
import checklistTodos from "./checklist-todos.vue";

export default {
  props:{
    card: Object
  },
  components: {
    checklistTodos
  },
  data() {
    return {

      }
    },

  computed: {
  },
  methods: {
  },
  created() {

  }

}
</script>