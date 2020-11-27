<template>
    <div class="card-details">
        <div class="header-card flex space-between">
            <div>
                <button>🎫</button>
                <span>{{ card.title }}</span>
            </div>
            <button @click="isShowDetails">X</button>
        </div>

        <div class="main-card flex space-between">
            <div class="main-contsnt">
                {{ card.labels }}
                <div>Descrition{{ card.description }}</div>
                <div>Activity</div>
            </div>
            <div class="nav clickable">
                <a @click="edit('join')">Join</a>
                <a @click="edit('members')">Members</a>
                <div class="relative" @click="edit('labels')">
                    <a>Labels</a>
                    <edit-container
                        v-if="currEdit === 'labels'"
                        :feature="'Labels'"
                    >
                        <card-labels
                            :chooseColor="chooseColor"
                            @updatingCard="updatingCard"
                            :card="card"
                            slot="edit-body"
                            @openColorModale="openColorModale"
                            @updatListOfColors="updatListOfColors"
                        />
                    </edit-container>
                    <edit-container
                        v-if="currEdit === 'colorPicker'"
                        :feature="'Created label'"
                    >
                        <color-picker
                            :card="card"
                            v-model="chooseColor"
                            slot="edit-body"
                            @openLabelsModal="openLabels"
                            
                        />
                    </edit-container>
                </div>
                <a @click="edit('checklist')">Checklist</a>
                <a @click="edit('due Date')">Due Date</a>
                <a @click="edit('attachment')">Attachment</a>
                <div class="relative" @click="edit('cover')">
                    <a>Cover</a>
                    <edit-container
                        :feature="'Cover-Card'"
                        v-if="currEdit === 'cover'"
                    >
                        <input type="text" slot="edit-body" />
                    </edit-container>
                </div>
                <div class="relative" @click="edit('move')">
                    <a>Move</a>
                    <edit-container
                        :feature="'Move-Card'"
                        v-if="currEdit === 'move'"
                    >
                        <card-move slot="edit-body" />
                    </edit-container>
                </div>
                <a @click="edit('copy')">Copy</a>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";
import editContainer from "./edit-container.vue";
import cardMove from "./card-move.vue";
import CardLabels from "./card-labels.vue";
import colorPicker from "../cmps/color-picker.vue";

export default {
    name: "card-details",
    props: {
        card: Object,
    },
    data() {
        return {
            currEdit: null,
            chooseColor: {},
            closeEditor: null,
            // feature: null,
            // copyCard:null
        };
    },
    methods: {
        isShowDetails() {
            this.$emit("closeModal");
        },
        edit(feature) {
            this.currEdit = feature;
        },
        updatingCard(card) {
            this.card = card;
            this.$emit("emitSaveBoard");
        },
        openColorModale() {
            this.edit("colorPicker");
        },
        openLabels(){
             this.edit("labels");
        },
        updatListOfColors(list){
            this.$emit("emitSaveBoard",list);
        }
    },
    computed: {},
    components: {
        cardMove,
        editContainer,
        CardLabels,
        colorPicker,
    },
    created() {
        eventBus.$on(CLOSE_EDIT, () => {
            this.currEdit = null;
        });
    },
};
</script>

