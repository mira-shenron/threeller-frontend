<template>
  <div>
    <div class="block">
      <el-date-picker
        v-model="time"
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
import {
  eventBus,
  SAVE_BOARD,
  CLOSE_DETAILS,
} from "@/services/event-bus.service.js";

export default {
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      time: "",
    };
  },
  methods: {
    changeDueDate() {
      this.card.dueDate = this.time;
      eventBus.$emit(SAVE_BOARD);
      eventBus.$emit(CLOSE_DETAILS);
    },
  },
  created() {
    this.card.dueDate ? this. time = this.card.dueDate : this.time = '';
  },
};
</script>                        