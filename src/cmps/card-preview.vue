<template>
    <section class="card" :class="{[style.color]: style.type === 'full-cover' }">
        <div v-if="style.type==='half-cover'" class="cover" :class="{[style.color]: style.type === 'half-cover' }"></div>
        <div class="card-container">
            <div v-if="card.labels && style.type !== 'full-cover'" class="card-labels flex">
                <div class="card-label" :class="label.color" v-for="label in card.labels" :key="label.id"></div>
            </div>
        <div class="card-title">{{ card.title }}</div>
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
        if(this.card.style){
            this.style = this.card.style;
        }
        console.log(this.card);
    }
};
</script>