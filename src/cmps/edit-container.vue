<template>
  <div class="edit-container">
    <div class="layout">
      <div class="card-actions-header flex space-between align-center">
        <div class="header-title">
          <div>{{ feature }}</div>
        </div>
        <span class="x-button" @click.stop="onEmitCloseEdit">
          <!-- <span class="lnr lnr-cross"></span> -->
          <i class="el-icon-close"></i>
        </span>
      </div>
      <slot name="edit-body"></slot>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from '@/services/event-bus.service.js'
export default {
  name: "card-edit",
  props: {
    feature: String,
  },
  methods: {
    onEmitCloseEdit() {
      eventBus.$emit(CLOSE_EDIT)
    }
  },
};
</script>