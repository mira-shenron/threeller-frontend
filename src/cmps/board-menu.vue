<template>
  <div class="board-menu">
    <div
      v-if="actionType"
      @click="changeMenuAction('')"
      class="back-btn flex align-center clickable"
    >
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="board-menu-header">
      <div class="board-menu-title">
        {{ actionType ? actionType : "Menu" }}
      </div>
    </div>
    <div @click="closeBoardMenu" class="close-btn flex align-center clickable">
      <i class="el-icon-close"></i>
    </div>
    <div class="board-menu-content">
      <slot name="edit-body">
        <ul class="board-actions clean-list">
          <li
            @click="changeMenuAction('Change Background')"
            class="change-bgc-li clickable"
          >
            Change Background
          </li>
          <li>Search Cards</li>
        </ul>
        <ul v-if="activities.length" class="board-actions clean-list">
          <li v-for="activity in activities" :key="activity.id">
            <menu-activity-details :activity="activity"/>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script>
import menuActivityDetails from '@/cmps/menu-activity-details.vue'
export default {
  props: {
    actionType: {
      type: String,
    },
  },
  components:{
    menuActivityDetails
  },
  computed: {
    activities(){
      const activities = JSON.parse(JSON.stringify(this.$store.getters.currBoard.activities))
      return activities.sort((act1, act2) => act2.createdAt - act1.createdAt)
    }
  },
  methods: {
    closeBoardMenu() {
      this.$emit("emmiToggleBoardMenu");
    },
    changeMenuAction(newType) {
      if (this.actionType === "Colors" || this.actionType === "Photos") {
        this.$emit("emitChangeMenuAction", "Change Background");
      } else this.$emit("emitChangeMenuAction", newType);
    },
  },
  created() {
    console.log(this.actionType);
  },
};
</script>