<template>
  <section class="todo flex align-center space-between">
    <div class="todo-details">
      <el-checkbox @change="toggleIsDone" v-model="todo.isDone"></el-checkbox>
      <span v-if="editClosed" class="clickable" @click.stop="toggleEdit">{{ todo.title }}</span>
      <span v-else>
        <input class="title-input" v-model="todo.title" />
        <div class="btn-container">
          <el-button size="small" type="success" @click="saveTodo"
            >Save</el-button
          >
          <span class="clickable" @click.stop="toggleEdit"
            ><i class="el-icon-close"></i
          ></span>
        </div>
      </span>
    </div>
    <i v-if="editClosed" class="el-icon-delete clickable" @click="deleteTodo"></i>
  </section>
</template>

<script>


export default {
  props: {
    todo: Object
  },
  data() {
    return {
      editClosed: true
    };
  },
  methods: {
    toggleIsDone() {
      this.$emit('toggleDone', this.todo);
    },
    deleteTodo() {
      this.$emit('deleteTodo', this.todo);
    },
    toggleEdit() {
      this.editClosed = !this.editClosed;
    },
    saveTodo(){
        this.$emit('saveTodo', this.todo);
        this.toggleEdit();
    }
  }
};
</script>