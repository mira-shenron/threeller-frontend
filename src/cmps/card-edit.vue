<template>
    <div class="main-edit">i am edit cmp- {{ feature }}
    <card-labels v-if="'labels'===feature"/>
        <!-- -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
    </div>
</template>

<script>
import cardLabels from './card-labels.vue';

// @ is an alias to /src
export default {
    name: "card-edit",
    props: {
        feature: String,
    },
    components: {
        cardLabels
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>
<style lang="scss" scoped>
.main-edit{

}
</style>