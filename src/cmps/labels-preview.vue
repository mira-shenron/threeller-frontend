<template>
    <div class="labels-preview flex warp" v-if="card.labels||card.labels.length">
        <h3>Labels</h3>
        <div >
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
    name:'labels-preview',
    props: {
        card: Object,
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        labels() {
            return this.card.labels;
        },
    },
    methods: {},
    created() {},
};
</script>