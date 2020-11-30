<template>
  <div>
    <div class="block">
      <el-date-picker
        v-model="dueDate.time"
        type="datetime"
        placeholder="Select date and time"
        @change="changeDueDate"
        format="dd/MM/yyyy h:mm A"
        value-format="timestamp"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      // time: "",
      dueDate:{
        time:'',
        isComplete:false
      }
    };
  },
  methods: {
    changeDueDate() {
      this.card.dueDate = this.dueDate;
      console.log('this.card:  ',this.card)
      this.$emit("updatingCard", this.card);
      // eventBus.$emit(SAVE_BOARD);
    },
  },
  created() {
    if(typeof(this.card.dueDate)==='number'){
      this.card.dueDate ? this.dueDate.time = this.card.dueDate : this.dueDate;
    }else if(typeof(this.card.dueDate)==='object'){
      this.card.dueDate ? this.dueDate.time = this.card.dueDate.time : this.dueDate;
    }
  },
};
</script>                        