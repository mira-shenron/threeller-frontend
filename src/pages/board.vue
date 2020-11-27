<template>
    <section v-if="board">
        <div>Board name: {{ board.title }}</div>
        <div>
            <input type="text" placeholder=" + Add List" v-model="listName" />
            <button @click="addList">Save</button>
        </div>
        <div class="board flex">
            <div
                class="list-wrapper"
                v-for="list in board.groups"
                :key="list.id"
            >
                <list
                    @emitSaveBoard="saveBoard"
                    @showCardDetails="showCardDetails"
                    :list="list"
                ></list>
            </div>
        </div>
        <div class="popup-details" v-if="isShowDetails">
            <card-details
                @emitSaveBoard="saveBoard" 
                @closeModal="closeModal"
                :card="cardDetailsToShow"
            >
            </card-details>
        </div>
    </section>
</template>

<script>
// import cardPreview from "@/cmps/card-preview.vue";
// @ is an alias to /src
import list from "@/cmps/list.vue";
import cardDetails from "@/cmps/card-details.vue";
import { boardService } from "../services/board.service.js";

export default {
    name: "board",
    components: {
        // cardPreview,
        cardDetails,
        list,
    },
    computed: {
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
        },
    },
    data() {
        return {
            isShowDetails: false,
            cardDetailsToShow: null,
            listName: "",
        };
    },
    methods: {
        addList() {
            var list = boardService.getEmptyList(this.listName);
            this.board.groups.push(list);
            this.saveBoard();
        },
        showCardDetails(card) {
            this.isShowDetails = true;
            this.cardDetailsToShow = card;
        },
        closeModal() {
            this.isShowDetails = false;
        },
        saveBoard(list) {
            if (list) {
                this.board.colorList=list
            }
            const board = this.board;
            console.log("save board:", board);
            this.$store.dispatch({
                type: "saveBoard",
                board,
            });
        },
        updatingList(card) {
            const idx = this.list.findIndex(
                (currCard) => currCard.id === card.id
            );
            if (!idx) return;
            this.list.splice(idx, 1, card);
        },
    },
};
</script>
<style lang="scss" scoped >
.popup-details {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(8, 8, 8, 0.5);
    height: 100%;
    width: 100%;
}
</style>


