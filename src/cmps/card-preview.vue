<template>
    <section class="card" :class="{[style.color]: style.type === 'full-cover' }">
        <div v-if="style.type==='half-cover'" class="cover" :class="{[style.color]: style.type === 'half-cover' }"></div>
        <div>
        <h3>{{ card.title }}</h3>
        </div>
    </section>
</template>

<script>
export default {
    name: "card-preview",
    props: {
        card: Object,
    },
    data() {
        return {
            style: {
              color:'white',
              type:null
            },
            color: '',
        };
    },
    methods: {
        onEmitDeleteCard() {
            this.$emit("emitDelete", this.card.id);
        }
    },
    created() {
        this.style = this.card.style;
    }
};
</script>