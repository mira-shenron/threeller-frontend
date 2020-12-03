<template>
    <div v-if="lists">
        <div class="flex">
            <div class="card-move-picked-list">
                <el-select
                    v-model="currList"
                    placeholder="Select List"
                    name="lists"
                    id="lists"
                >
                    <el-option
                        v-for="list in lists"
                        :key="list.id"
                        :label="list.title"
                        :value="list"
                        >{{ list.title }}
                    </el-option>
                </el-select>
            </div>

            <div
                class="card-move-picked-card"
                v-if="currList && currList.cards.length > 0"
            >
                <el-select
                    name="cards"
                    id="cards"
                    v-model="selectedCardIdx"
                    placeholder="Position"
                >
                    <el-option
                        v-for="(card, idx) in currList.cards"
                        :value="idx"
                        :key="card.id"
                        :label="idx + 1"
                        >{{ idx + 1 }}
                        <span v-if="card.id === currCard.id">(current)</span>
                    </el-option>
                    <el-option v-if="!isOption" :value="currList.cards.length">
                        {{ currList.cards.length + 1 }}
                    </el-option>
                </el-select>
            </div>
            <div
                class="card-move-picked-card"
                v-if="currList && currList.cards.length === 0"
            >
                <el-select
                    name="cards"
                    id="cards"
                    v-model="selectedCardIdx"
                    placeholder="Position"
                >
                    <el-option :value="0">1 </el-option>
                </el-select>
            </div>
        </div>

        <el-button @click.stop="moveCard" type="success">Move</el-button>
    </div>
</template>
<script>
import {
    eventBus,
    MOVE_CARD,
    CLOSE_DETAILS,
} from "@/services/event-bus.service.js";

export default {
    props: {
        currCard: {
            type: Object,
        },
    },
    data() {
        return {
            currList: null,
            selectedCardIdx: null,
        };
    },
    computed: {
        lists() {
            return JSON.parse(JSON.stringify(this.$store.getters.getLists));
        },
        isOption() {
            return this.currList.cards.find(
                (card) => card.id === this.currCard.id
            );
        },
    },
    methods: {
        moveCard() {
            if (this.selectedCardIdx < 0 || this.selectedCardIdx === null)
                return;
            console.log(this.selectedCardIdx);
            eventBus.$emit(MOVE_CARD, {
                list: this.currList,
                idx: this.selectedCardIdx,
                card: this.currCard,
            });
            this.currList = null;
            this.selectedCardIdx = null;
            eventBus.$emit(CLOSE_DETAILS);
        },
    },
};
</script>