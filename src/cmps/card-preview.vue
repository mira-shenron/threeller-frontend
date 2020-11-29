<template>
    <section class="card" :class="{[style.color]: style.type === 'full-cover' }">
        <div v-if="style.type==='half-cover'" class="cover" :class="{[style.color]: style.type === 'half-cover' }"></div>
        <div>
        <div class="card-title">{{ card.title }}</div>
        </div>
        {{style}}
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
        console.log(this.style);
    }
};
</script>