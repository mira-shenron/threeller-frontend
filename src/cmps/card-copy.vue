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
                        > {{list.title}} </el-option>
                    </el-select>
                </div>
                <div  v-if="currList && currList.cards.length > 0" class="card-move-picked-card">
                    <el-select v-model="selectedCardIdx" placeholder="Position" name="cards"
                    id="cards">
                        <el-option
                            v-for="(card, idx) in currList.cards"
                            :value="idx"
                            :key="card.id"
                            :label="(idx + 1)"
                           
                            
                        > {{idx + 1}}<span v-if="card.id === currCard.id">(current)</span>
                        </el-option>
                        <el-option
                             :value="currList.cards.length"
                        > {{currList.cards.length + 1}}
                        </el-option>
                    </el-select>
                </div>
                <div v-if="currList && currList.cards.length === 0"  class="card-move-picked-card">
                    <el-select v-model="selectedCardIdx" placeholder="Position" name="cards"
                    id="cards">
                        <el-option
                            :value="0"
                        > 1
                        </el-option>
                    </el-select>
                </div>
            </div>
            <el-button @click="copyCard" type="success">Create Card</el-button>
    </div>
</template>
<script>
import {
    eventBus,
    COPY_CARD,
    CLOSE_DETAILS,
} from "@/services/event-bus.service.js";
import utilService from "../services/util.service";

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
    },
    methods: {
        copyCard() {
            if (this.selectedCardIdx < 0 || this.selectedCardIdx === null)
                return;
            const card = JSON.parse(JSON.stringify(this.currCard));
            card.id = utilService.makeId();
            console.log(card.id);
            eventBus.$emit(COPY_CARD, {
                list: this.currList,
                idx: this.selectedCardIdx,
                card,
            });
            this.currList = null;
            this.selectedCardIdx = null;
            eventBus.$emit(CLOSE_DETAILS);
        },
    },
};
</script>