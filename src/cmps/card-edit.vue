<template>
    <div class="main-edit">
        <h1>{{feature}}</h1>
        <slot name="edit"></slot>
    </div>
</template>

<script>
// import cardLabels from './card-labels.vue';

// @ is an alias to /src
export default {
    name: "card-edit",
    props: {
        feature: String,
    },
    components: {
        // cardLabels
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>
<style lang="scss" scoped>

</style>