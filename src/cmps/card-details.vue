<template>
    <div class="card-details">
        <div class="header-card flex space-between">
            <div class="flex align-center">
                <img width="45px" src="../assets/card-icons/card.png" alt="" />
                <span class="card-title">{{ card.title }}</span>
            </div>
            <span class="clickable" @click="isShowDetails">X</span>
        </div>
        <div class="main-card flex space-between">
            <div class="main-content">
                <div>Members</div>
                <div>membersToShow</div>
                <div class="card-descrp">
                    <div class="flex align-center">
                        <img
                            width="40px"
                            src="../assets/card-icons/description.png"
                            alt=""
                        />
                        <div>Description</div>
                    </div>
                    <div
                        v-if="showDesc"
                        class="description clickable"
                        @click.stop="openShowDesc"
                    >
                        {{ descriptionOnDiv }}
                    </div>
                    <div v-else>
                        <textarea
                            rows="10"
                            cols="80"
                            v-model="descriptionOnText"
                            placeholder="Add new description"
                        ></textarea>
                        <div>
                            <button class="clickable" @click="saveDescription">
                                Save
                            </button>
                            <span
                                class="clickable"
                                @click.stop="closeDescriptionEdit"
                                >X</span
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card-activities">
                        <div class="flex align-center">
                            <img
                                width="40px"
                                src="../assets/card-icons/activities.png"
                                alt=""
                            />
                            <div>Activity</div>
                        </div>
                        <div class="activities-list">
                            <div class="flex align-center">
                                <vue-initials-img
                                    class="avatar"
                                    :name="currUser"
                                />
                                <input
                                    class="comment-input"
                                    placeholder="Write a comment"
                                    type="text"
                                />
                            </div>

                            <div v-for="activity in acts" :key="activity.id">
                                <activity-details
                                    :activity="activity"
                                ></activity-details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav clickable">
                <a @click="edit('join')">Join</a>

                <div class="relative" @click="edit('members')">
                    <a>Members</a>
                    <edit-container
                        :feature="'Members'"
                        v-if="currEdit === 'members'"
                    >
                        <card-members
                            slot="edit-body"
                            :card="card"
                            :members="members"
                        />
                    </edit-container>
                </div>

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

                <div class="relative" @click="edit('dueDate')">
                    <a>Due Date</a>
                    <edit-container
                        :feature="'Change Due Date'"
                        v-if="currEdit === 'dueDate'"
                    >
                        <due-date slot="edit-body" :card="card" />
                    </edit-container>
                </div>
                <a @click="edit('attachment')">Attachment</a>
                <div class="relative" @click="edit('cover')">
                    <a>Cover</a>
                    <edit-container
                        :feature="'Cover-Card'"
                        v-if="currEdit === 'cover'"
                    >
                    <card-cover slot="edit-body" :card="card"></card-cover>
                        <!-- <input type="text" slot="edit-body" /> -->
                    </edit-container>
                </div>
                <div class="relative" @click="edit('move')">
                    <a>Move</a>
                    <edit-container
                        :feature="'Move-Card'"
                        v-if="currEdit === 'move'"
                    >
                        <card-move slot="edit-body" :currCard="card" />
                    </edit-container>
                </div>
                <div class="relative" @click="edit('copy')">
                    <a>Copy</a>
                    <edit-container
                        :feature="'Copy-Card'"
                        v-if="currEdit === 'copy'"
                    >
                        <card-copy slot="edit-body" :currCard="card" />
                    </edit-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";
import editContainer from "./edit-container.vue";
import cardMove from "./card-move.vue";
import cardCopy from "./card-copy.vue";
import dueDate from "./due-date.vue";
import activityDetails from "./activity-details.vue";
import cardMembers from "./card-members.vue";
import colorPicker from "./color-picker.vue";
import cardLabels from "./card-labels.vue";
import cardCover from './card-cover.vue';



export default {
    name: "card-details",
    props: {
        card: Object,
        members: Array,
    },
    data() {
        return {
            currEdit: null,
            descriptionOnDiv: "",
            descriptionOnText: "",
            activities: [],
            currUser: "Abi Abambi", //temp,
            showDesc: true,
            chooseColor: {},
            closeEditor: null,
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
        openLabels() {
            this.edit("labels");
        },
        updatListOfColors(list) {
            this.$emit("emitSaveBoard", list);
        },

        openShowDesc() {
            this.showDesc = !this.showDesc;
            this.descriptionOnText = this.card.description
                ? this.card.description
                : "";
        },
        closeDescriptionEdit() {
            this.descriptionOnDiv = this.card.description
                ? this.card.description
                : "Add something here";
            this.descriptionOnText = this.card.description
                ? this.card.description
                : "";
            this.showDesc = !this.showDesc;
        },
        saveDescription() {
            this.card.description = this.descriptionOnText;
            this.descriptionOnDiv = this.descriptionOnText;
            this.$emit("emitSaveBoard");
            this.showDesc = !this.showDesc;
        },
    },
    components: {
        colorPicker,
        cardLabels,
        cardMove,
        cardCopy,
        editContainer,
        dueDate,
        activityDetails,
        cardMembers,
        cardCover,
    },
    computed: {
        acts() {
            var board = JSON.parse(
                JSON.stringify(this.$store.getters.currBoard)
            );
            var res = board.activities.filter(
                (actv) => actv.card.id === this.card.id
            );
            return res;
        },
        membersToShow() {
            return "placeholder";
        },
    },
    created() {
        eventBus.$on(CLOSE_EDIT, () => {
            this.currEdit = null;
        });

        this.descriptionOnDiv = this.card.description
            ? this.card.description
            : "Add something here";
    },
};
</script>

