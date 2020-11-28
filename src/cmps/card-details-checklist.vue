<template>
  <div class="flex column">
    <div v-for="checklist in checklists" :key="checklist.id">
        <checklist-todos :checklist="checklist"></checklist-todos>
    </div>
  </div>
</template>

<script>
import checklistTodos from "./checklist-todos.vue";

export default {
  props:{
    checklists: Array
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