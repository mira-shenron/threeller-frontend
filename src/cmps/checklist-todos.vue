<template>
  <section class="checklist-container">
    <div class="flex space-between">
      <div class="flex align-center">
        <img src="../assets/action-icons/checkmarks.png" alt="" />
        <div>{{ checklist.title }}</div>
      </div>
      <button class="delete-checklist-btn" @click="deleteChecklist">
        Delete
      </button>
    </div>
    <el-progress color="green" :percentage="percentage"></el-progress>
    <div v-if="checklist.todos">
      <div v-for="todo in checklist.todos" :key="todo.id">
        <todo @saveTodo="updateTodo" @deleteTodo="deleteTodo" @toggleDone="updateTodo" :todo="todo"></todo>
      </div>
    </div>
    <button v-if="closedEdit" class="delete-checklist-btn" @click="toggleEdit">Add an item</button>
    <div v-else>
      <textarea rows="3" cols="80" v-model="newTodoTitle" placeholder="Add an item"></textarea>
      <div>
        <el-button size="small" type="success" @click="addTodo">Add</el-button>
        <span class="clickable" @click.stop="toggleEdit"
          ><i class="el-icon-close"></i
        ></span>
      </div>
    </div>
  </section>
</template>

<script>
import todo from './todo.vue';
import { eventBus, SAVE_MEMBERS } from "@/services/event-bus.service.js";
import { boardService } from '../services/board.service';

export default {
  props: {
    checklist: Object,
    card: Object
  },
  data() {
    return {
      closedEdit: true,
      newTodoTitle: ''
    };
  },
  components: {
    todo
  },
  computed: {
    percentage() {
      var todoNum = 0;
      var done = 0;
      if (this.checklist.todos) {
        todoNum = this.checklist.todos.length;
        this.checklist.todos.forEach((todo) => {
          if (todo.isDone) done++;
        })
      }
      if (todoNum != 0) return Math.round(done / todoNum * 100);
      else return 0;
    }
  },
  methods: {
    updateTodo(todo) {
      console.log(todo);
      eventBus.$emit(SAVE_MEMBERS, this.card);
    },
    deleteTodo(todo){
      var todoIdx = this.checklist.todos.findIndex(currTodo => currTodo.id === todo.id);
      if(todoIdx != -1) this.checklist.todos.splice(todoIdx,1);
      var listIdx = this.card.checklists.findIndex(list => list.id === this.checklist.id);
      if (listIdx != -1) this.card.checklists.splice(listIdx, 1, this.checklist);
      eventBus.$emit(SAVE_MEMBERS, this.card);
    },
    addTodo(){
      var todo = boardService.getEmptyTodo(this.newTodoTitle);
      this.checklist.todos.push(todo);
      var idx = this.card.checklists.findIndex(list => list.id === this.checklist.id);
      if (idx != -1) this.card.checklists.splice(idx, 1, this.checklist);
      eventBus.$emit(SAVE_MEMBERS, this.card);
      this.toggleEdit();
      this.newTodoTitle = '';
    },
    deleteChecklist() {
      var idx = this.card.checklists.findIndex(list => list.id === this.checklist.id);
      if (idx != -1) this.card.checklists.splice(idx, 1);
      eventBus.$emit(SAVE_MEMBERS, this.card);
    },
    toggleEdit(){
      this.closedEdit = !this.closedEdit;
    }
  }

};
</script>