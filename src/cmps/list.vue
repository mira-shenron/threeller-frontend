<template>
    <section class="flex column list">
        <div class="name">List name: {{ list.title }}</div>
        <ul v-for="card in list.cards" :key="card.id">
            <li >
                <card-preview
                    @click.native="showCardDetails(card)"
                    :card="card"
                ></card-preview>
            </li>
        </ul>
        <li>
            <form @submit.prevent="saveCard">
                <input
                    type="text"
                    v-model="newCard.title"
                    placeholder="title od the card"
                />
                <!-- <input
                    type="text"
                    v-model="newCard.id"
                    placeholder="id of the card"
                /> -->
                <button>save</button>
            </form>
        </li>
      

    </section>
</template>

<script>
// @ is an alias to /src
import cardPreview from "@/cmps/card-preview.vue";

export default {
    props: ["list"],
    components: {
      cardPreview,
    },
    data() {
        return {
            cards: [
                {
                    id: "11",
                    title: "aaa",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa doloribus maxime harum soluta unde perspiciatis sequi ducimus atque, quod facilis fugit magni, aliquam vel fuga veritatis natus repellendus illo!",
                },
                {
                    id: "12",
                    title: "bbb",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa doloribus maxime harum soluta unde perspiciatis sequi ducimus atque, quod facilis fugit magni, aliquam vel fuga veritatis natus repellendus illo!",
                },
            ],
            newCard: {
                id: "",
                title: "",
            },
            
        };
    },
    methods: {
        saveCard() {
            this.cards.push(this.newCard);
            this.newCard = {
                id: "",
                title: "",
            };
        },
        showCardDetails(card){
          this.$emit('showCardDetails',card)
          
        }
    },
    created() {
        console.log(this.list);
    },
};
</script>
<style lang="scss" scoped>
.list {
    height: 200px;
    width: 300px;
    border: 1px solid black;
    background-color: rgb(243, 174, 174);
}

.name {
    font-weight: bold;
}
</style>