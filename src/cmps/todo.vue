<template>
  <section class="todo flex align-center space-between">
    <div class="todo-details">
      <el-checkbox @change="toggleIsDone" v-model="todo.isDone"></el-checkbox>
      <span>{{ todo.title }}</span>
    </div>
    <i class="el-icon-delete clickable" @click="deleteTodo"></i>
  </section>
</template>

<script>


export default {
  props: {
    todo: Object
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    toggleIsDone() {
      this.$emit('toggleDone', this.todo);
    },
    deleteTodo() {
        this.$emit('deleteTodo', this.todo);
    }
  },
  created() {

  }

};
</script>