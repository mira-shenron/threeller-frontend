<template>
    <div class="card-details-labels flex column warp" v-if="haveLabels">
        <h3>Labels</h3>
        <div class="flex">
            <span
            v-for="label in labels"
                :key="label.id"
                class="card-label"
                :class="{ [label.color]: label.color }"
            >{{ label.txt }}
            </span>
            <!-- <span @click="open">+</span> -->
        </div>
    </div>
</template>

<script>
// import Avatar from 'vue-avatar-component';

export default {
    name:'card-details-labels',
    props: {
        card: Object,
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        haveLabels(){
            return this.card.labels.length

        },
        labels() {
            return this.card.labels;
        },
    },
    methods: {},
    created() {},
};
</script>