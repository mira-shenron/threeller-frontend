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
      <div class="card-title">{{ card.title }}</div>
      <div class="card-badges">
        <div v-if="card.dueDate && style.type !== 'full-cover'" class="due-date" :class="dueDateClass">
          <i class="el-icon-time"></i>
          <div class="badge-text">
            {{ moment(card.dueDate.time).format("MMM D") }}
            <span v-if="isShowYear">{{
              moment(card.dueDate.time).format(", YYYY")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: "card-preview",
  props: {
    card: Object,
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
        if (!this.card.dueDate) return
        const dueDate = new Date(this.card.dueDate.time)
        const nowDate = new Date(Date.now())
        console.log(dueDate.getFullYear(), nowDate.getFullYear());
        if (dueDate.getFullYear() - nowDate.getFullYear() !== 0) return true
        else return false
    },
    dueDateClass(){
        if (!this.card.dueDate) return
        const dueDate = this.card.dueDate.time
        const nowDate = Date.now()
        if(this.card.dueDate.isComplete) return 'done'
        else if (moment(dueDate).diff(moment(nowDate), 'seconds') < 0) return 'overdue'
        else if (moment(dueDate).diff(moment(nowDate), 'hours') < 24) return 'due-soon'
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
    console.log(this.dueDateClass);
  },
};
</script>