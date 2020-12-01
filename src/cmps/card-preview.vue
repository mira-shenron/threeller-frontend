<template>
  <section class="card" :class="{ [style.color]: style.type === 'full-cover' }">
    <div
      v-if="style.type === 'half-cover'"
      class="cover"
      :class="{ [style.color]: style.type === 'half-cover' }"
    ></div>
    <div class="card-container">
      <div
        v-if="card.labels && style.type !== 'full-cover'"
        class="card-labels flex"
      >
        <div
          class="card-label"
          :class="label.color"
          v-for="label in card.labels"
          :key="label.id"
        ></div>
      </div>
      <div
        class="card-title"
        :class="{ 'covered-text': style.type === 'full-cover' }"
      >
        {{ card.title }}
      </div>
      <div v-if="style.type !== 'full-cover'" class="card-badges">
        <div v-if="card.dueDate" class="due-date" :class="dueDateClass">
          <i class="el-icon-time"></i>
          <div class="badge-text">
            {{ moment(card.dueDate.time).format("MMM D") }}
            <span v-if="isShowYear">{{
              moment(card.dueDate.time).format(", YYYY")
            }}</span>
          </div>
        </div>
        <div v-if="card.description" class="card-description">
          <i class="el-icon-s-document"></i>
        </div>
        <div v-if="card.comments" class="card-comment">
          <i class="el-icon-s-comment"></i>
          <div class="badge-text">
            {{ card.comments }}
          </div>
        </div>
        <div v-if="card.checklists" class="card-checklist" :class="todoClass">
          <i class="el-icon-s-order"></i>
          <div class="badge-text">{{ doneTodos }}/{{ allTodos }}</div>
        </div>
      </div>
      <div
        v-if="card.members && style.type !== 'full-cover'"
        class="card-members"
      >
        <avatar class="card-member" fullname="My Sticker" :size="28"></avatar>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import Avatar from "vue-avatar-component";

export default {
  name: "card-preview",
  props: {
    card: Object,
  },
  components: {
    Avatar,
  },
  data() {
    return {
      style: {
        color: "white",
        type: null,
      },
      color: "",
    };
  },
  computed: {
    isShowYear() {
      if (!this.card.dueDate) return;
      const dueDate = new Date(this.card.dueDate.time);
      const nowDate = new Date(Date.now());
      if (dueDate.getFullYear() - nowDate.getFullYear() !== 0) return true;
      else return false;
    },
    dueDateClass() {
      if (!this.card.dueDate) return;
      const dueDate = this.card.dueDate.time;
      const nowDate = Date.now();
      if (this.card.dueDate.isComplete) return "done";
      else if (moment(dueDate).diff(moment(nowDate), "seconds") < 0)
        return "overdue";
      else if (moment(dueDate).diff(moment(nowDate), "hours") < 24)
        return "due-soon";
      else return null;
    },
    doneTodos() {
      if (!this.card.checklists) return;
      const counter = this.card.checklists.reduce((acc,checklist)=>{
        checklist.todos.forEach(todo => {
          if (todo.isDone) acc++
        });
        return acc
      },0)
      return counter;
    },
    allTodos() {
      if (!this.card.checklists) return;
            const counter = this.card.checklists.reduce((acc,checklist)=>{
        checklist.todos.forEach(() => {
           acc++
        });
        return acc
      },0)
      return counter;
    },
    todoClass(){
      if (this.allTodos === this.doneTodos) return 'done';
      else return null
    }
  },
  methods: {
    onEmitDeleteCard() {
      this.$emit("emitDelete", this.card.id);
    },
  },
  created() {
    if (this.card.style) {
      this.style = this.card.style;
    }
  },
};
</script>