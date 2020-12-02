<template>
    <div class="edit-container">
        <div class="card-actions-header flex align-center clickable">
            <div class="header-title">{{ feature }}</div>
            <div class="x-button" @click.stop="onEmitCloseEdit">
                <!-- <span class="lnr lnr-cross"></span> -->
                <i class="el-icon-close"></i>
            </div>
        </div>
        <div class="layout">
            <slot name="edit-body"></slot>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";
export default {
    name: "card-edit",
    props: {
        feature: String,
    },
    methods: {
        onEmitCloseEdit() {
            eventBus.$emit(CLOSE_EDIT);
        },
    },
};
</script>