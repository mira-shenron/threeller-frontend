<template>
    <div
        class="card-details-due-date flex column warp"
        v-if="card.dueDate && card.dueDate.time"
    >
        <h3>due date</h3>
        <div class="flex">
            <el-checkbox
                @change="updateingCard"
                v-model="card.dueDate.isComplete"
            ></el-checkbox>
            <div class="time-to-show">
                {{ dateToShow }}
                <span v-if="card.dueDate.isComplete">Complete</span>
            </div>
        </div>
    </div>
</template>

<script>
// import Avatar from 'vue-avatar-component';
import utilService from "../services/util.service";
export default {
    name: "card-details-due-date",
    props: {
        card: Object,
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        dateToShow() {
            return utilService.showTime(this.card.dueDate.time);
        },
    },
    methods: {
        toggleIsComplete() {
            console.log(
                "card.dueDate.isComplete: ",
                this.card.dueDate.isComplete
            );
        },
        updateingCard() {
            this.$emit("updatingCard", this.card);
        },
    },
    created() {},
};
</script>